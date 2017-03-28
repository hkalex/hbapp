#!/bin/bash

MONGO_PORT=27017
APPNAME=mongodb
DBNAME=hbapp


echo "Droppping postcodes collection..."
sudo docker exec $APPNAME mongo $DBNAME --eval 'db.postcodes.drop()'
echo "postcodes collection dropped"
echo "Importing postcodes_AU.csv to postcodes collection..."
sudo docker exec $APPNAME mongoimport -d $DBNAME -c postcodes --type csv --file /data/initData/postcode_AU.csv --headerline
echo "Imported"
