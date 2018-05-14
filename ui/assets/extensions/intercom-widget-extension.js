(function() {
  'use strict';

  /*
   * Extension for loading the Intercom API widget for tracking and messaging customers
   */
  angular
    .module('openshiftOnlineConsoleIntercomExtension', ['openshiftConsole'])
    .run(function($rootScope, $q) {
      if (typeof Intercom === "undefined") {
        window.Intercom = function() {
          Intercom.updateSettings(arguments);
        };
        Intercom.q = [];
        Intercom.updateSettings = function(args) {
          Intercom.q.push(args);
        };
      }

      var managedIDAnnotation = "openshift.io/online-managed-id"
      var managedUserSecret = "openshift.io/managed-user-secret"
      var userAppID = "openshift.io/intercom-app-id"

      $rootScope.$watch('user', function(user) {
        var annotations = _.get(user, 'metadata.annotations', {});
        if (!annotations[managedIDAnnotation] ||
            !annotations[managedUserSecret] ||
            !annotations[userAppID]) {
          return;
        }

	if ($('#intercom-widget-script').length == 0) {
          var userID = user.metadata.annotations[managedIDAnnotation];
          var userHash = user.metadata.annotations[managedUserSecret];
          var appID = user.metadata.annotations[userAppID];
          window.Intercom("boot", {
            app_id: appID,
            user_id: userID,
            user_hash: userHash
          });

          (function() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.intercom.io/widget/"+appID;
            s.id = "intercom-widget-script"
            var x = document.getElementsByTagName("script")[0];
            x.parentNode.insertBefore(s, x);
          })();
	}
      });

      // TODO:
      // use Angular.js to run this when the view and/or URL changes
      // window.Intercom("update");

      // use Angular.js to run this when the current user logs out
      // window.Intercom("shutdown");
    });

  hawtioPluginLoader.addModule('openshiftOnlineConsoleIntercomExtension');
})();
