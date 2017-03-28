#!/bin/bash

# This will be mounted into the docker. Please assume it will be run inside the docker!!


# remove all files in /temp
rm -rf /temp

node /opt/api/bundle/main.js
