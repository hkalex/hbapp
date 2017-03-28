#!/bin/bash

. /opt/common/start.sh


DIR = "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NAME = hbapp
PORT = 3000

startProgram $DIR $NAME $PORT
