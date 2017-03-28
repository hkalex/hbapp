#!/bin/bash

# This will be mounted into the docker. Please assume it will be run inside the docker!!

# set folders permission
sudo chmod -R a+rw /opt/src
sudo chmod -R a+rw /opt/output

# remove all files in /opt/output. The folder is mapped in start.sh
sudo rm -rf /opt/output/*


SERVER=http://SENSITY
VERSION=0.1.17045
SRC=/opt/src/hb-app
OUTPUT=/opt/output/$VERSION


sudo mkdir $OUTPUT
sudo chmod -R a+rw $OUTPUT


# hbconsole
echo "*** Building hbconsole ***"
(cd $SRC/hbconsole && \
 meteor npm install)

(cd $SRC/hbconsole && \
 meteor build $OUTPUT --directory --server-only --server=$SERVER:4000)
echo "*** hbconsole built ***"

(cd $OUTPUT/bundle/programs/server && meteor npm install)
cp $SRC/hbconsole/settings.json $OUTPUT/settings-hbconsole.json
(cd $OUTPUT && tar cf $OUTPUT/hbconsole-ready-$VERSION.tar bundle settings-hbconsole.json)
rm -rf $OUTPUT/bundle
echo "*** hbconsole packaged ***"


# hbapp
echo "*** Building hbapp ***"
(cd $SRC/hbapp && \
 meteor npm install)

(cd $SRC/hbapp && \
 meteor build $OUTPUT --directory --server-only --server=$SERVER:3000)
echo "*** hbapp built ***"

(cd $OUTPUT/bundle/programs/server && meteor npm install)
cp $SRC/hbapp/settings.json $OUTPUT/settings-hbapp.json
(cd $OUTPUT && tar cf $OUTPUT/hbapp-ready-$VERSION.tar bundle settings-hbapp.json)
rm -rf $OUTPUT/bundle
echo "*** hbapp packaged ***"
