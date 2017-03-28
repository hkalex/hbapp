import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { PhotoSimpleSchema } from './Photo';
import { AreaSimpleSchema } from './Area';
import { PriceSimpleSchema } from './Price';

export const FloorPlan = {
  title: {
    type: String,
  },
  photos: {
    type: [PhotoSimpleSchema]
  },
  numBed: {
    type: Number,
    decimal: true
  },
  numCarPark: {
    type: Number
  },
  numToilet: {
    type: Number,
    decimal: true
  },
  area: {
    type: AreaSimpleSchema,
  },
  price: {
    type: PriceSimpleSchema
  }
};

export const FloorPlanSimpleSchema = new SimpleSchema(FloorPlan);
