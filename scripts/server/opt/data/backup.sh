#!/bin/bash

MONGO_PORT=27017
DATADIR=/opt/data
APPNAME=mongodb
DBNAME=hbapp
TS=$(date '+%Y%m%d_%H%M%S')

sudo docker exec $APPNAME mongodump -d $DBNAME -o /data/backup/$TS
