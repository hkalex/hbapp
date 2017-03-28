#!/bin/bash

echo "Droppping postcodes collection..."
docker exec mongodb mongo meteor --eval 'db.postcodes.drop()'
echo "postcodes collection dropped"
echo "Importing postcodes_AU.csv to postcodes collection..."
docker exec mongodb mongoimport -d meteor -c postcodes --type csv --file /data/initData/postcode_AU.csv --headerline
echo "Imported"
