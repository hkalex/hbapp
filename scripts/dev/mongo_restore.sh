#!/bin/bash

docker exec mongodb mongorestore -d meteor --drop /data/dump/meteor