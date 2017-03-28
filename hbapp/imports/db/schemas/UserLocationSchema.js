import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var LocationInfo = {
  // type = Home, Office...etc
  type: {
    type: String,
    optional: true
  },

  // geo stores the longtitude and latitdue
  geo: {
    type: String,
    optional: true
  },
  
  // address
  address: {
    type: String,
    optional: true
  }
}

export var LocationInfoSchema = new SimpleSchema(LocationInfo);


var UserLocation = {
  userId : {
    type: String
  },
  locations: {
    type: [LocationInfoSchema],
    optional: true
  }
}

export var UserLocationSchema = new SimpleSchema(UserLocation);
