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

- oso_extensions_target
- oso_extensions_stylesheet
- oso_extensions_scripts

oso_extensions_target must be set to either 'free' or 'paid'.  This corresponds to 
the file structure of the online-console-extensions repository.
```
oso_extensions_target will be one of 'free|paid'.
 osod_cluster_tier ==> oso_extensions_target
           starter ==> free
               pro ==> paid 
             ipaas ==> free
              osio ==> free
```

Here's an example for how to set stylesheet/scripts urls:
```
( when osod_cluster_tier == "pro" )
- set_fact:
    openshift_extension_script_urls: "[ 'https://{{ oso_ext_appname }}-{{ oso_ext_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/ui/assets/extensions/online-extensions.js', 'https://{{ oso_ext_appname }}-{{ oso_ext_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/ui/assets/extensions/intercom-widget-extension.js', 'https://{{ oso_ext_appname }}-{{ oso_ext_namespace }}.{{ openshift_master_default_subdomain }}/ui/assets/extensions/online-notifications.js' ]"

( when osod_cluster_tier == "starter"|"ipaas"|"osio" )
- set_fact:
    openshift_extension_script_urls: "[ 'https://{{ oso_ext_appname }}-{{ oso_ext_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/assets/extensions/online-extensions.js' ]"
  when: tier == "starter"

( same for all osod_cluster_tier )
- set_fact:
    openshift_extension_stylesheet_urls: "[ 'https://{{ oso_ext_appname }}-{{ oso_ext_namespace }}.{{ hostvars[groups['OSEv3'][0]].openshift_master_default_subdomain }}/assets/extensions/online-extensions.css']"

```


