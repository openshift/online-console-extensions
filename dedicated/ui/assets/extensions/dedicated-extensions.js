/*
  This file contains extensions being used by the OpenShift Online Dedicated Cluster
  They can be used as reference examples.
*/

/*
  Override the CLI download locations
*/
window.OPENSHIFT_CONSTANTS.CLI = {
  "Linux (64 bits)": window.OPENSHIFT_EXTENSION_PROPERTIES.CLI_linux64,
  "Windows":         window.OPENSHIFT_EXTENSION_PROPERTIES.CLI_windows,
  "Mac OS X":        window.OPENSHIFT_EXTENSION_PROPERTIES.CLI_mac
};

/*
  Override the documentation links
*/
window.OPENSHIFT_CONSTANTS.HELP_BASE_URL = window.OPENSHIFT_EXTENSION_PROPERTIES.doc_url;

angular.module('openshiftDedicatedConsoleExtensions', ['openshiftConsole'])
  .run(function(extensionRegistry) {

    /*
      Add additional items to the help dropdown in the top navigation bar
    */
    extensionRegistry.add('nav-help-dropdown', function ($scope) {
      var li = $('<li>');
      $('<a href="'+window.OPENSHIFT_EXTENSION_PROPERTIES.support_link+'" target="_blank">Support</a>')
        .appendTo(li);
      return li;
    });

    extensionRegistry.add('nav-help-dropdown', function ($scope) {
      return $('<li class="divider">');
    });

  });

/*
  Register the custom angular module
*/
hawtioPluginLoader.addModule('openshiftDedicatedConsoleExtensions');
