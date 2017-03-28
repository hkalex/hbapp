DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DATADIR=$DIR/../data
SRCDIR=$DIR/../hbapp

if [ ! -d "$DATADIR" ]; then
  mkdir $DATADIR
  mkdir $DATADIR/db
  mkdir $DATADIR/config
  echo "dbpath=/data/db" > $DATADIR/config/mongodb.conf
fi

# sudo docker rm -f mongodb

# sudo docker run \
#   -d \
#   --restart=always \
#   --publish=27017:27017 \
#   --volume=$DATADIR/db:/data/db \
#   --volume=$DATADIR/config/mongodb.conf:/mongodb.conf \
#   --name=mongodb \
#   mongo mongod -f /mongodb.conf

# docker exec -it some-mongo mongo admin
# db.createUser({ user: 'admin', pwd: 'admin', roles: [ { role: "dbAdminAnyDatabase", db: "admin" } ] });

sudo docker rm -f meteordev

echo "Mapping $SRCDIR to /bundle/src"

sudo docker run \
  -it \
  --publish=3000-3010:3000-3010 \
  --publish=80:80 \
  --publish=443:443 \
  --volume=$SRCDIR:/bundle/src \
  --name=meteordev \
  --hostname=meteordev \
  --user=coder \
  --env-file=meteordev_env.list \
  hbapp/meteordev:latest \
  bash meteor node /bundle/bundle/start_meteor.sh
#  --volume=$SRCDIR:/bundle/src \
