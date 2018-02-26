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
    "                  <a target=\"_blank\" href=\"https://www.openshift.com\">OpenShift</a> is Red Hat's container application platform\n" +
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

}]);
