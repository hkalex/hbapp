import { Meteor } from 'meteor/meteor';

import SchemaBase from '/imports/db/SchemaBase';
import { PriceSimpleSchema } from './Price';

import DN from '/imports/dn/';

const StatusSimpleSchema = new SchemaBase({
  status: {
    type: String
  },
  statusRemark: {
    type: String,
    optional: true
  },
  files: {
    type: [String],
    optional: true
  },
  at: {
    type: Date
  },
  by: {
    type: String
  }
});


export const Order = {
  projectId: {
    type: String
  },
  userId: {
    type: String,
    autoform: {
      options: function () {
        return Meteor.users.find().fetch().map((v) => {
          if (v._id) {
            if (v.phoneNum) {
              return { label: v.phoneNum, value: v._id };
            } else if (v.username) {
              return { label: v.username, value: v._id };
            }
          }
        });
      }
    }
  },
  agentId: {
    type: String,
    // TODO: in future, select user's roles is agent(consultant)
    autoform: {
      options: function () {
        return Meteor.users.find().fetch().map((v) => {
          if (v._id) {
            if (v.phoneNum) {
              return { label: v.phoneNum, value: v._id };
            } else if (v.username) {
              return { label: v.username, value: v._id };
            }
          }
        });
      }
    }
  },

  status: {
    type: StatusSimpleSchema
  },
  statusHistory: {
    type: [StatusSimpleSchema],
    optional: true
  },


  orderNum: {
    type: String,
    optional: true
  },
  orderType: {
    type: String,
    optional: true
  },


  paymentSteps: {
    type: [
      new SchemaBase({
        type: {
          type: String
        },
        price: {
          type: PriceSimpleSchema
        },
        paid: {
          type: Boolean,
          defaultValue: false
        },
        channel: {
          type: String
        },
        toAccount: {
          type: String
        },
        instruction: {
          type: String
        },
        dueAt: {
          type: Date
        },
        read: {
          type: Boolean,
          defaultValue: false
        }
      })
    ],
    optional: true
  },
  paymentHistory: {
    type: [
      new SchemaBase({
        price: {
          type: PriceSimpleSchema
        },
        channel: {
          type: String
        },
        toAccount: {
          type: String
        },
        at: {
          type: Date
        },
        by: {
          type: String
        }
      })
    ],
    optional: true
  },

  lotOptions: {
    type: [
      new SchemaBase({
        lotNum: {
          type: String
        },
        finalised: {
          type: Boolean,
          optional: true
        }
      })
    ]
  },

  files: {
    type: [String],
    optional: true
  },
/*
  ** DN is now defined in SchemaBase.js **

  DN: {
    type: Object,
    optional: true,
    blackbox: true
  }
*/
};

export const OrderSimpleSchema = new SchemaBase(Order);

OrderSimpleSchema.attachRelationship({
  projectId: { // projectId is the field name in OrderSimpleSchema
    parent: {
      collection: "projects",
      field: "_id",
      autoform: {
        subscription: null,
        label: "title",
        sorter: null,
        filter: null,
        mapper: null,
        projector: null
      }
    },
    dn: {
      project: {
        projectId: new DN.Expression("ref._id._str"), // "ref" is the found Project document
        projectName: "title", // set Order.DN.projectName = project.title
        projectImage: new DN.Expression("ref.photos[0]"), // set Order.DN.project.image = eval(project.photos[0])
        price: "fromPrice", // set Order.DN.project.price = project.fromPrice
        address: true,
        expectedSettleAt: true,
        projectTags: "topTags"
      }
    }
  },
  userId: {
    parent: {
      collection: "users",
      field: "_id",
      autoform: {
        subscription: "allusers",
        label: "phoneNum"
      }
    }
  },
  agentId: {
    parent: {
      collection: "users",
      field: "_id",
      autoform: {
        subscription: "allusers",
        label: "phoneNum"
      }
    }
  }
})
