# online-console-extensions
OpenShift Online extensions to the Origin Web Console

This repository contains various CSS, JavaScript, and HTML files used by OpenShift Online to extend the OpenShift Web Console.

These files are built and deployed in an Apache HTTP Server container. This can be tested in an OpenShift cluster with the following command:

`$ oc new-app centos/httpd-24-centos7~https://github.com/openshift/online-console-extensions`

If you run `oc expose svc/online-console-extensions` you will be able to see the files in a web browser under `<route>/ui`

## Building HTML templates

To serve HTML templates without requiring CORS headers, they are converted into Javascript which is then included as a dependency to our main online extensions module, injecting the HTML into the pages.

If your pull request fails a Jenkins job with the message `FAILURE: ONLINE-CONSOLE-EXTENSIONS GENERATED TEMPLATE CHECK`, it means you may have made changes to one of these templates and forgotten to generate the new templates and commit the results. You can run the `hack/check-generated-templates.sh` script (which is what the Jenkins job runs) in your branch, which will return a diff of any files which need to be generated and narrow your debugging.

To generate the Javascript, (for example, after you've made a change to an HTML template) ensure that Grunt is installed (`sudo npm install`) and run:

`grunt build --env=<free/paid/dedicated/notifications>`

which will generate the file under `<env>/ui/assets/extensions/templates.js`. This file needs to be included as an `extensionScript` in the openshift-web-console project.

Note that if this is not done, your template changes will not take effect!

## Custom builder image

To provide consistent URLs for our hosted files, we use a custom builder image (built on top of `rhscl/httpd-24-rhel7`) which copies the files from `free` or `paid` into a common `/ui` directory.

To simulate this, first build the custom image:

```
$ cd s2i-custom-builder
$ docker build -t oso-console-extensions-builder .
```

Then, build the image with s2i passing the desired environment as a variable (`TARGET=<free/paid>`), eg:

```
s2i build https://github.com/openshift/online-console-extensions oso-console-extensions-builder oso-console-extensions -e TARGET=paid
```