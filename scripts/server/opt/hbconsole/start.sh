#!/bin/bash
 
. /opt/common/start.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NAME = hbconsole
PORT = 4000

startProgram $DIR $NAME $PORT
