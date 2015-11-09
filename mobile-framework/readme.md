## React/JSX/Meteor Framework for iHealth

Using the Packages
On terminal, open ~/.bash_profile
Add the following lines to your file:
'''
export PACKAGE_ROOT=/apps/framework-iHealth/library
export PACKAGE_DIRS=$PACKAGE_ROOT/both:$PACKAGE_ROOT/mobile:$PACKAGE_ROOT/webapp
'''
This variable is different for every user. Make sure to edit the export variables to match the location of the folders in your computer.
Save the file and reset your terminal.


[git-packages.json](https://github.com/iHealthLab/framework-iHealth/blob/master/ihealth-packages-mobile/git-packages.json) is the mgp file for private meteor packages. It is a simple tool to automate downloading GitHub folders to the meteor package folder. Copy [git-packages.json](https://github.com/iHealthLab/framework-iHealth/blob/master/ihealth-packages-mobile/git-packages.json) to the root folder of your app and run mgp. If you don't have mgp, run ```npm -g install mgp```.

```'com.ihealth.plugin.bpmanagercordova'``` changes often, so check that the ```ihealth-packages-mobile/packages/ihealth:bp5-cordova/package.js``` package refers to the latest commit by running ```curl https://api.github.com/repos/iHealthLab/plugin-ihealth-bp/commits/master | grep sha\"```. This is the only place the commit SHA has to be updated for the plugin-ihealth-bp to work properly.

## git-packages.json example
```
