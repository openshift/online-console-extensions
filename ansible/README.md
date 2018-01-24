# oso_console_extensions

An Ansible role to deploy the OpenShift Online console extensions.

The online-console-extensions app is responsible for serving online-specific
ui extensions and custom templates.

The OpenShift template in this role will deploy the application by building from
the source in the online-console-extensions git repository with a custom 
centos/httpd-24-centos7 builder image.

## Dependencies

- lib_openshift role from openshift-ansible must be loaded in a playbook prior to running this role.
- oc_start_build_check role from online-archivist repository. (included via gogitit)
- lib_utils roles from openshift-ansible
- openshift_facts from openshift-ansible

## Role Variables

See defaults/main.yml and files/console-extensions-template.yml for default values.

### Required

- osce_target
- osce_stylesheet
- osce_scripts
- osce_properties

osce_target must be set to either 'free' or 'paid'.  This corresponds to 
the file structure of the online-console-extensions repository.
```
osce_target will be one of 'free|paid'.
 osod_cluster_tier ==> osce_target
           starter ==> free
               pro ==> paid 
             ipaas ==> free
              osio ==> free
```

Here's an example for how to set stylesheet/scripts urls:
```
( when osod_cluster_tier == "pro" )
- set_fact:
    openshift_extension_script_urls:
      - "https://{{ osce_appname }}-{{ osce_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/ui/assets/extensions/online-extensions.js"
      - "https://{{ osce_appname }}-{{ osce_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/ui/assets/extensions/intercom-widget-extension.js"
      - "https://{{ osce_appname }}-{{ osce_namespace }}.{{ openshift_master_default_subdomain }}/ui/assets/extensions/online-notifications.js"

( when osod_cluster_tier == "starter"|"ipaas"|"osio" )
- set_fact:
    openshift_extension_script_urls:
      - "https://{{ osce_appname }}-{{ osce_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/assets/extensions/online-extensions.js"
  when: tier == "starter"

( same for all osod_cluster_tier )
- set_fact:
    openshift_extension_stylesheet_urls:
      - "https://{{ osce_appname }}-{{ osce_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/assets/extensions/online-extensions.css"

```

Extension properties:
```
- set_fact:
    openshift_extension_properties:
      online_version: '3.6.0.87'
      support_link: 'https://access.redhat.com/'
      doc_url: 'https://docs.openshift.com/online/'
      ...
```


