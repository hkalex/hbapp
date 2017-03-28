#!/bin/bash
. set_env.sh

MP=${MONGO_PORT:-27017}

export MONGO_URL=mongodb://127.0.0.1:$MP/meteor
export PORT=4000
export APP_NAME=hbconsole

# Generate the settings.gen.json
meteor node ./imports/settings/settings.$APP_NAME.js > settings.gen.json


if [ "$1" == "test" ]; then
  export TEST_WATCH=1
  export MONGO_URL=mongodb://127.0.0.1:$MP/meteor-test
  echo "MONGO_URL is $MONGO_URL"
  meteor test --driver-package=practicalmeteor:mocha --settings settings.gen.json --port $PORT
else
  echo "MONGO_URL is $MONGO_URL"
  meteor run $1 --port $PORT --settings settings.gen.json
fi
