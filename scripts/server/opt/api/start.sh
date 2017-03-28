#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APPNAME=api
# IMAGENAME=node@4.8 # node 4.8 is the same node version as Meteor
IMAGENAME=node:alpine # this is the alpine Linux
PORT=5000

sudo docker rm -f $APPNAME

sudo docker run \
  -d \
  --rm \
  --restart=always \
  --publish=$PORT:$PORT \
  --link=mongodb \
  --volume=$DIR/bundle:/opt/api/bundle \
  --volume=$DIR/kicker.sh:/opt/api/kicker.sh \
  --volume=$DIR/settings.json:/opt/api/settings.json \
  --volume=$DIR/temp:/temp \
  --env PORT=$PORT \
  --env-file=$DIR/env.list \
  --name=$APPNAME \
  --hostname=$APPNAME \
  $IMAGENAME \
  sh /opt/api/kicker.sh
