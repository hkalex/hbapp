#!/bin/bash

# get current folder
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATADIR=$DIR/../../data

export MONGO_PORT=27017


# create folders
if [ ! -d "$DATADIR" ]; then mkdir $DATADIR; fi
if [ ! -d "$DATADIR/db" ]; then mkdir $DATADIR/db; fi
if [ ! -d "$DATADIR/dump" ]; then mkdir $DATADIR/dump; fi
if [ ! -d "$DATADIR/config" ]; then mkdir $DATADIR/config; fi
echo "dbpath=/data/db" > $DATADIR/config/mongodb.conf

docker rm -f mongodb

docker run \
  -d \
  --restart=always \
  --publish=$MONGO_PORT:$MONGO_PORT \
  --volume=$DATADIR/db:/data/db \
  --volume=$DATADIR/dump:/data/dump \
  --volume=$DATADIR/initData:/data/initData \
  --volume=$DATADIR/config/mongodb.conf:/mongodb.conf \
  --name=mongodb \
  --hostname=mongodb \
  mongo mongod -f /mongodb.conf

# get mongodb IP
MONGODB_IP=$(docker inspect --format="{{ .NetworkSettings.Networks.bridge.IPAddress }}" mongodb 2> /dev/null)


# docker exec mongodb mongorestore -d meteor --drop /data/dump/meteor

export MONGO_URL=mongodb://localhost:$MONGO_PORT/meteor
