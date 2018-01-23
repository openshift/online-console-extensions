(function() {
  'use strict';

  // Add a Notifications submenu under Monitoring
  var monitoringMenu = _.find(window.OPENSHIFT_CONSTANTS.PROJECT_NAVIGATION, { label: 'Monitoring' });
  monitoringMenu.secondaryNavSections = [{
    items: [{
      href: monitoringMenu.href,
      label: "Monitoring and Events"
    }, {
      href: "/online/notifications",
      label: "Notifications"
    }]
  }];
  delete monitoringMenu.href;

  angular
    .module('onlineNotificationExtensions', ['openshiftConsole', 'openshiftOnlineConsoleTemplates'])
    .controller('OnlineNotificationController', function ($routeParams,
                                                          $location,
                                                          $scope,
                                                          $filter,
                                                          DataService,
                                                          ProjectsService) {

      var NOTIFICATION_CONFIG_MAP_NAME = 'openshift-online-notifications';

      $scope.projectName = $routeParams.project;
      $scope.alerts = $scope.alerts || {};
      $scope.renderOptions = $scope.renderOptions || {};
      $scope.disableInputs = false;

      $scope.forms = $scope.forms || {};

      $scope.config = {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
          name: NOTIFICATION_CONFIG_MAP_NAME
        },
        data: {
          deployments: 'false',
          builds: 'false',
          storage: 'false'
        }
      };
      $scope.updatedPrefs = {};

      $scope.reset = function () {
        $scope.updatedPrefs = angular.copy($scope.config.data);

        var form = $scope.forms.notifications;
        form.$setPristine();
        form.$setUntouched();
      };

      ProjectsService
        .get($routeParams.project)
        .then(_.spread(function (project, context) {
          $scope.project = project;
          $scope.requester = project.metadata.annotations['openshift.io/requester'];

          $scope.save = function () {
            var _handleSuccess = function (resource) {
              $scope.config = angular.copy(resource);
              $scope.reset();

              $scope.alerts['onlineNotificationPreferences'] = {
                type: "success",
                message: "Successfully saved notification preferences."
              }
              $scope.disableInputs = false;
            };

            var _handleFailure = function (error) {
              var details = $filter('getErrorDetails')(error);
              if (details) {
                details = "Reason: " + details;
              }
              $scope.alerts['onlineNotificationPreferences'] = {
                type: "error",
                message: "Failed to save notification preferences.",
                details: details
              };
              $scope.disableInputs = false;
            }

            var config = angular.copy($scope.config);
            // If a key is not provided in the form submit data, set it to false
            // This ensures that invalid values are overwritten with either "true" or "false" upon save
            config.data.deployments = ($scope.updatedPrefs.deployments && $scope.updatedPrefs.deployments === "true") ? $scope.updatedPrefs.deployments : "false";
            config.data.builds = ($scope.updatedPrefs.builds && $scope.updatedPrefs.builds === "true") ? $scope.updatedPrefs.builds : "false";
            config.data.storage = ($scope.updatedPrefs.storage && $scope.updatedPrefs.storage === "true") ? $scope.updatedPrefs.storage : "false";
            $scope.disableInputs = true;

            // If there's no resource version, the config hasn't been persisted
            if (!config.metadata.resourceVersion) {
              DataService
                .create("configmaps", null, config, context)
                .then(_handleSuccess, _handleFailure);
            } else {
              DataService
                .update("configmaps", NOTIFICATION_CONFIG_MAP_NAME, config, context)
                .then(_handleSuccess, _handleFailure);
            }
          };

          DataService
            .get("configmaps", NOTIFICATION_CONFIG_MAP_NAME, context, {
              errorNotification: false
            })
            .then(function (resource) {
              // Validate all keys are set by us, or alert otherwise
              _.forEach(resource.data, function(value, key) {
                if (key !== "deployments" && key !== "builds" && key !== "storage") {
                  $scope.alerts['onlineNotificationPreferences'] = {
                    type: "warning",
                    message: "Notification preferences contain an unknown type.",
                    details: "The ConfigMap '" + NOTIFICATION_CONFIG_MAP_NAME + "' is used for storing notification preferences and should not be used for any other purpose.  Other values may be discarded or overwritten if these preferences are saved."
                  };
                }
              })

              $scope.config = angular.copy(resource);
              $scope.reset();
            }, function (error) {
              // If the map isn't found, we need to create it on save
              if (error.status === 404) {
                return;
              }

              var details = $filter('getErrorDetails')(error);
              if (details) {
                details = "Reason: " + details;
              }
              $scope.alerts['onlineNotificationPreferences'] = {
                type: "error",
                message: "Failed to read notification preferences for project " + $scope.projectName + ".",
                details: details
              };
            });
        }));
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/project/:project/online/notifications', {
          templateUrl: 'online/ui/custom-templates/online-notifications.html',
          controller: 'OnlineNotificationController'
        })
    });

  hawtioPluginLoader.addModule('onlineNotificationExtensions');
})();
