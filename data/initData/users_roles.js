db.roles.update(
  { _id: "K3FwMmwnuv78mEcJ2" },
  { $set: { name: "customer" } },
  true
);
db.roles.update(
  { _id: "hkiirFDDkikMbcABq" },
  { $set: { name: "builder" } },
  true
);
db.roles.update(
  { _id: "QGNbmPHi6aBiLGF58" },
  { $set: { name: "consultant" } },
  true
);
db.roles.update(
  { _id: "XGZgQirWGRsT7ZHm9" },
  { $set: { name: "admin" } },
  true
);


db.users.update(
  { "_id": "QBvuSBnfQzuHuGmzM", },
  {
    $set: {
      roles: [
        "customer",
        "builder",
        "consultant",
        "admin"
      ],
      profile: {
        avatar: "/images/kitten.png"
      },
      username: "1d9436c477306167c87cfb8a5677c912cc5e0c01",
      createdAt: "2016-12-19T10:35:55.457Z",
      services: {
        password: {
          bcrypt: "$2a$10$6K0fN4aW8/EFsKe0MSJCwehNz8gNft2ZHsFB9eM3MSzVo64kJyQvK"
        }
      },
      phoneNum: "18600000000"
    }
  },
  true
);

db.users.update(
  { _id: "YFstfkRK3CkpHrFpF" },
  {
    $set: {
      roles: [
        "customer"
      ],
      profile: {
        avatar: "/images/kitten.png"
      },
      username: "41e331b19ad3eb08e07a83b712b975a1c919cdaa",
      createdAt: "2016-12-19T01:14:03.668Z",
      services: {
        password: {
          bcrypt: "$2a$10$rR3flqEnYMqFtCfVr4dWGemC4gqW8a7n3..Xr65UZ4isCihX.pDRe"
        },
        resume: {
          loginTokens: []
        }
      },
      phoneNum: "13000000000"
    }
  },
  true
);