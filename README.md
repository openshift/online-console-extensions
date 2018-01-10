# online-console-extensions
OpenShift Online extensions to the Origin Web Console

This repository contains various CSS, JavaScript, and HTML files used by OpenShift Online to extend the OpenShift Web Console.

These files are built and deployed in an Apache HTTP Server container. This can be tested in an OpenShift cluster with the following command:

`$ oc new-app centos/httpd-24-centos7~https://github.com/openshift/online-console-extensions`

If you run `oc expose svc/online-console-extensions` you will be able to see the files in a web browser under `<route>/ui`


