#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

APPNAME=builder

sudo docker rm -f $APPNAME

sudo docker run \
  --rm \
  --volume=$DIR/src:/opt/src:rw \
  --volume=$DIR/output:/opt/output:rw \
  --volume=$DIR/kicker.sh:/bundle/kicker.sh \
  --name=$APPNAME \
  --hostname=$APPNAME \
  --user=coder \
  hbapp/meteord:20161217 \
  bash /bundle/kicker.sh
