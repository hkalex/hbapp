#!/bin/bash

startProgram() {

DATADIR=/opt/data
DIR = $1
APPNAME=$2
PORT=$3

sudo docker rm -f $APPNAME

sudo docker run \
  -d \
  --rm \
  --restart=always \
  --publish=$PORT:$PORT \
  --link=mongodb \
  --volume=$DIR/bundle:/bundle/bundle \
  --volume=$DIR/kicker.sh:/bundle/kicker.sh \
  --volume=$DIR/settings.json:/bundle/settings.json \
  --volume=$DATADIR/cfs:/bundle/cfs \
  --volume=$DATADIR/temp:/temp \
  --env-file=$DIR/env.list \
  --name=$APPNAME \
  --hostname=$APPNAME \
  --user=coder \
  hbapp/meteord:20161217 \
  bash /bundle/kicker.sh

}

export startProgram
