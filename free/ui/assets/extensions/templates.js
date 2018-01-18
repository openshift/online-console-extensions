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
    "                <p><a target=\"_blank\" href=\"https://openshift.com\">OpenShift</a> is Red Hat's Platform-as-a-Service (PaaS) that allows developers to quickly develop, host, and scale applications in a cloud environment.</p>\n" +
    "\n" +
    "                <h2 id=\"version\">Version</h2>\n" +
    "                <dl class=\"dl-horizontal left\">\n" +
    "                  <dt>OpenShift Master:</dt>\n" +
    "                  <dd>{{version.master.openshift || 'unknown'}}</dd>\n" +
    "                  <dt>Kubernetes Master:</dt>\n" +
    "                  <dd>{{version.master.kubernetes || 'unknown'}}</dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <h2>Registry</h2>\n" +
    "                <p>\n" +
    "                  You can push images to and pull images from the registry via:\n" +
    "                  <copy-to-clipboard display-wide=\"true\" clipboard-text=\"online_registry_url\" input-text=\"online_registry_url\" class=\"ng-isolate-scope\"></copy-to-clipboard>\n" +
    "                </p>\n" +
    "\n" +
    "                <p>The <a target=\"_blank\" href=\"{{'welcome' | helpLink}}\">documentation</a> contains information and guides to help you learn about OpenShift and start exploring its features. From getting started with creating your first application, to trying out more advanced build and deployment techniques, it provides what you need to set up and manage your OpenShift environment as an application developer.</p>\n" +
    "\n" +
    "                <p>With the OpenShift command line interface (CLI), you can create applications and manage OpenShift projects from a terminal. To get started using the CLI, visit <a href=\"command-line\">Command Line Tools</a>.</p>\n" +
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
