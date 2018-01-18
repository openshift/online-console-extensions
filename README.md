# online-console-extensions
OpenShift Online extensions to the Origin Web Console

This repository contains various CSS, JavaScript, and HTML files used by OpenShift Online to extend the OpenShift Web Console.

These files are built and deployed in an Apache HTTP Server container. This can be tested in an OpenShift cluster with the following command:

`$ oc new-app centos/httpd-24-centos7~https://github.com/openshift/online-console-extensions`

If you run `oc expose svc/online-console-extensions` you will be able to see the files in a web browser under `<route>/ui`

## Building HTML templates

To serve HTML templates without requiring CORS headers, they are converted into Javascript which is then included as a dependency to our main online extensions module, injecting the HTML into the pages. To generate the Javascript, (for example, after you've made a change to an HTML template) ensure that Grunt is installed (`sudo npm install`) and run:

`grunt build --env=<free/paid/dedicated/notifications>`

which will generate the file under `<env>/ui/assets/extensions/templates.js`. This file needs to be included as an `extensionScript` in the openshift-web-console project.