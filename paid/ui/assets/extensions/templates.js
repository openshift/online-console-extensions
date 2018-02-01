angular.module('openshiftOnlineConsoleTemplates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('online/ui/custom-templates/about.html',
    "<div class=\"middle surface-shaded\">\n" +
    "  <div class=\"middle-content\">\n" +
    "    <div class=\"container gutter-top\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div class=\"about\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-2 about-icon gutter-top hidden-sm hidden-xs\">\n" +
    "                <img src=\"images/openshift-logo.svg\" />\n" +
    "              </div>\n" +
    "              <div class=\"col-md-9\">\n" +
    "                <h1>Red Hat OpenShift <span class=\"about-reg\">&reg;</span></h1>\n" +
    "                <h2>About</h2>\n" +
    "                <p>\n" +
    "                  <a target=\"_blank\" href=\"https://openshift.com\">OpenShift</a> is Red Hat's container application platform\n" +
    "                  that allows developers to quickly develop, host, and scale applications in a cloud environment.\n" +
    "                </p>\n" +
    "\n" +
    "                <h2 id=\"version\">Version</h2>\n" +
    "                <dl class=\"dl-horizontal left\">\n" +
    "                  <dt>OpenShift Master:</dt>\n" +
    "                  <dd>\n" +
    "                    {{version.master.openshift}} {{online_version}}\n" +
    "                  </dd>\n" +
    "                  <dt>Kubernetes Master:</dt>\n" +
    "                  <dd>\n" +
    "                    {{version.master.kubernetes}}\n" +
    "                  </dd>\n" +
    "                  <dt>OpenShift Web Console:</dt>\n" +
    "                  <dd>\n" +
    "                    {{version.console}}\n" +
    "                  </dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <h2>Registry</h2>\n" +
    "                <p>\n" +
    "                  You can push images to and pull images from the registry via:\n" +
    "                  <copy-to-clipboard display-wide=\"true\" clipboard-text=\"online_registry_url\" input-text=\"online_registry_url\" class=\"ng-isolate-scope\"></copy-to-clipboard>\n" +
    "                </p>\n" +
    "\n" +
    "                <p>\n" +
    "                  The <a target=\"_blank\" ng-href=\"{{'welcome' | helpLink}}\">documentation</a> helps you learn about\n" +
    "                  OpenShift and start exploring its features. From getting started with creating your first application\n" +
    "                  to trying out more advanced build and deployment techniques, it provides guidance on setting up and\n" +
    "                  managing your OpenShift environment as an application developer.\n" +
    "                </p>\n" +
    "\n" +
    "                <p>\n" +
    "                  With the OpenShift command line interface (CLI), you can create applications and manage OpenShift\n" +
    "                  projects from a terminal. To get started using the CLI, visit\n" +
    "                  <a href=\"command-line\">Command Line Tools</a>.\n" +
    "                </p>\n" +
    "\n" +
    "                <h2>Account</h2>\n" +
    "                <p>\n" +
    "                  You are currently logged in under the user account <strong>{{user.metadata.name}}</strong>.\n" +
    "                </p>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div><!-- /row -->\n" +
    "    </div><!-- /container -->\n" +
    "  </div><!-- /middle-content -->\n" +
    "</div><!-- /middle -->\n"
  );


  $templateCache.put('online/ui/custom-templates/online-notifications.html',
    "<project-header class=\"top-header\"></project-header>\n" +
    "<project-page class=\"online-notifications\">\n" +
    "  <!-- Middle section -->\n" +
    "  <div class=\"middle-section\">\n" +
    "    <div class=\"middle-container\">\n" +
    "      <div class=\"middle-header\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "          <div class=\"page-header\">\n" +
    "            <h1>\n" +
    "              Notifications\n" +
    "              <span class=\"page-header-link page-header-bleed-right\">\n" +
    "                <a ng-href=\"{{'notifications' | helpLink}}\" target=\"_blank\">\n" +
    "                  Learn More <i class=\"fa fa-external-link\" aria-hidden=\"true\"></i>\n" +
    "                </a>\n" +
    "              </span>\n" +
    "            </h1>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div><!-- /middle-header-->\n" +
    "      <div class=\"middle-content\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-lg-8\">\n" +
    "              <p>Control which critical event email notifications to receive from OpenShift Online.</p>\n" +
    "              <alerts alerts=\"alerts\"></alerts>\n" +
    "              <p>Email notifications for project <strong>{{projectName}}</strong> will be sent to <strong>{{requester}}</strong></p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-md-10 col-lg-8\">\n" +
    "              <form name=\"forms.notifications\">\n" +
    "                <fieldset ng-disabled=\"disableInputs\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <h4>Send notifications about critical events related to:</h4>\n" +
    "                    <div class=\"checkbox\">\n" +
    "                      <label>\n" +
    "                        <input ng-model=\"updatedPrefs.deployments\" ng-true-value=\"'true'\" ng-false-value=\"'false'\" type=\"checkbox\" autocomplete=\"off\">\n" +
    "                        Application deployments\n" +
    "                      </label>\n" +
    "                      <div style=\"padding-left: 20px\">Example: Requesting more replicas than your quota allows.</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"checkbox\">\n" +
    "                      <label>\n" +
    "                        <input ng-model=\"updatedPrefs.builds\" ng-true-value=\"'true'\" ng-false-value=\"'false'\" type=\"checkbox\" autocomplete=\"off\">\n" +
    "                        Builds\n" +
    "                      </label>\n" +
    "                      <div style=\"padding-left: 20px\">Example: An automatically-triggered build fails, no notifications sent for repeat failures.</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"checkbox\">\n" +
    "                      <label>\n" +
    "                        <input ng-model=\"updatedPrefs.storage\" ng-true-value=\"'true'\" ng-false-value=\"'false'\" type=\"checkbox\" autocomplete=\"off\">\n" +
    "                        Storage and persistent volumes\n" +
    "                      </label>\n" +
    "                      <div style=\"padding-left: 20px\">Example: Unable to find a volume that satisfies the constraints defined in your persistent volume claim (PVC).</div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"button-group gutter-top gutter-bottom\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"save()\" ng-disabled=\"forms.notifications.$invalid || forms.notifications.$pristine || disableInputs\" value=\"\">Save</button>\n" +
    "                    <a ng-if=\"!forms.notifications.$pristine\" href=\"\" ng-click=\"reset()\" class=\"mar-left-sm\" style=\"vertical-align: -2px\">Clear changes</a>\n" +
    "                  </div>\n" +
    "                </fieldset>\n" +
    "              </form>\n" +
    "            </div><!-- /col-* -->\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div><!-- /middle-content -->\n" +
    "    </div><!-- /middle-container -->\n" +
    "  </div><!-- /middle-section -->\n" +
    "</project-page>\n"
  );

}]);
