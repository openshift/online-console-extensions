/*
 * This file contains extensions for OpenShift Online.  They can be used as
 * reference examples.
 */

/*
 * Use the Immediately-Invoked Function Expression (IIFE) pattern to avoid
 * accidentally leaking globals or causing Strict Mode to be applied against
 * other extensions.
 */
(function() {
  'use strict';

  /*
   * Override download locations for command-line tools, so that the version
   * always matches the platform version.
   *
   * See also: https://docs.openshift.org/latest/install_config/web_console_customization.html#adding-or-changing-links-to-download-the-cli
   */
  window.OPENSHIFT_CONSTANTS.CLI = {
    "Linux (64 bits)": window.OPENSHIFT_EXTENSION_PROPERTIES.CLI_linux64,
    "Windows":         window.OPENSHIFT_EXTENSION_PROPERTIES.CLI_windows,
    "Mac OS X":        window.OPENSHIFT_EXTENSION_PROPERTIES.CLI_mac
  };

  /*
   * Override the documentation links
   */
  window.OPENSHIFT_CONSTANTS.HELP_BASE_URL = window.OPENSHIFT_EXTENSION_PROPERTIES.doc_url;

  /*
   * "install_guide" links that need to be manually overwritten for Online
   */
  window.OPENSHIFT_CONSTANTS.HELP["storage_classes"] = window.OPENSHIFT_EXTENSION_PROPERTIES.doc_url+"dev_guide/storage_classes.html";
  window.OPENSHIFT_CONSTANTS.HELP["selector_label"] = window.OPENSHIFT_EXTENSION_PROPERTIES.doc_url+"dev_guide/selector_label_volume_binding.html";
  window.OPENSHIFT_CONSTANTS.HELP["notifications"] = window.OPENSHIFT_EXTENSION_PROPERTIES.doc_url+"dev_guide/notifications.html";

  if (window.OPENSHIFT_EXTENSION_PROPERTIES.online_version) {
    window.OPENSHIFT_VERSION.openshift = window.OPENSHIFT_VERSION.openshift + " (online version " + window.OPENSHIFT_EXTENSION_PROPERTIES.online_version + ")";
  }
  if (window.OPENSHIFT_EXTENSION_PROPERTIES.enable_pipelines) {
    window.OPENSHIFT_CONSTANTS.ENABLE_TECH_PREVIEW_FEATURE.pipelines = true;
  }

  // Add an OpenJDK subcategory under Java in the add to project catalog.
  var categoryItems = _.get(window.OPENSHIFT_CONSTANTS, 'CATALOG_CATEGORIES', []);
  var languageCategory = _.find(categoryItems, { id: 'languages' });
  if (!languageCategory) {
    return;
  }

  var javaCategory = _.find(languageCategory.items, { id: 'java' });
  if (!javaCategory) {
    return;
  }

  var subcategory = _.head(javaCategory.subcategories);
  if (!subcategory || !subcategory.items) {
    return;
  }

  subcategory.items.unshift({
      id: 'openjdk',
      label: 'OpenJDK'
  });

  /*
   * Custom angular module
   */
  angular
    .module('openshiftOnlineConsoleExtensions', ['openshiftConsole'])
    .config(function($routeProvider) {
      $routeProvider
	.when('/about', {
	  templateUrl: 'extensions/about/about.html',
	  controller: 'AboutController'
	});
    })
    .run(function(extensionRegistry, $rootScope) {
      if(window.OPENSHIFT_EXTENSION_PROPERTIES.registry_url) {
	$rootScope.online_registry_url = window.OPENSHIFT_EXTENSION_PROPERTIES.registry_url
      }
      
      /*
       * Request system status from statuspage.io
       */
      var system_status_elem = $('<a href="' + window.OPENSHIFT_EXTENSION_PROPERTIES.status_link + '" target="_blank" class="nav-item-iconic system-status project-action-btn">');
      var system_status_elem_mobile = $('<div row flex class="navbar-flex-btn system-status-mobile">');

      $.getJSON(window.OPENSHIFT_EXTENSION_PROPERTIES.status_page, function (data) {
        var n = (data.incidents || []).length;

        if (n > 0) {
          var issueStr = n + ' open issue';
          if (n !== 1) {
            issueStr += "s";
          }
          $('<span title="System Status" class="fa status-icon pficon-warning-triangle-o"></span>').appendTo(system_status_elem);
          $('<span class="status-issue">' + issueStr + '</span>').appendTo(system_status_elem);

          system_status_elem_mobile.append(system_status_elem.clone());

          // only add the extension if there is something to show so we
          // do not generate empty nodes if no issues
          extensionRegistry
            .add('nav-system-status', function() {
              return [{
                type: 'dom',
                node: system_status_elem
              }];
            });

          extensionRegistry
            .add('nav-system-status-mobile', function() {
              return [{
                type: 'dom',
                node: system_status_elem_mobile
              }];
            });
        }
      });

      if (window.OPENSHIFT_EXTENSION_PROPERTIES.account_url) {
        extensionRegistry
          .add('nav-user-dropdown', function() {
            return [{
              type: 'dom',
              node: '<li class="divider"></li>'
            }, {
              type: 'dom',
              node: '<li><a href="' + window.OPENSHIFT_EXTENSION_PROPERTIES.account_url  + '" target="_blank">Manage Account</a></li>'
            }];
          });
      }

      extensionRegistry
        .add('nav-help-dropdown', function() {
          return [{
            type: 'dom',
            node: '<li><a href="' + window.OPENSHIFT_EXTENSION_PROPERTIES.help_link_url + '" target="_blank">' + window.OPENSHIFT_EXTENSION_PROPERTIES.help_link_text + '</a></li>'
          }, {
            type: 'dom',
            node: '<li class="divider"></li>'
          }, {
            type: 'dom',
            node: '<li><a href="' + window.OPENSHIFT_EXTENSION_PROPERTIES.status_link  + '" target="_blank">System Status</a></li>'
          }];
        });
    });

    /*
     * Register the custom angular module
     */
    hawtioPluginLoader.addModule('openshiftOnlineConsoleExtensions');
})();
