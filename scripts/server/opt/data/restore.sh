#!/bin/bash

MONGO_PORT=27017
DATADIR=/opt/data
APPNAME=mongodb
DBNAME=hbapp

sudo docker exec $APPNAME mongorestore -d $DBNAME --drop /data/dump/meteor
