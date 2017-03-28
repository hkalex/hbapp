if [ ! -n "$MONGO_URL" ] ;then
    mongo mongodb://127.0.0.1:27017/meteor -quiet ../data/initData/users_roles.js ../data/initData/lists.js
else
    mongo $MONGO_URL -quiet ../../data/initData/users_roles.js ../../data/initData/lists.js
fi
