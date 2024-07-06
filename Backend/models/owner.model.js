const { hash } = require('bcryptjs');
const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { required } = require('joi');
const { ENUM: { ACCOMODATIONS, GENDER, DIETARY, DURATIONTYPE  } } = require('../helpers/constant.helper');

const ownerSchema = new Schema(
  {
    availabelSpace: {
        type: Number,
        default: 1
    },
    photoes: {
       type: [String],
    },
    address: {
        type: String,
        required: true,
    },
    googleMapLink:{
        type: String
    },
    nearestBusStopDistance: {
        type: Number
    },
    alreadyLiving: {
        type: Number
    },
    parking: {
        type: Boolean
    },
    duration: {
      type : Number,
    },
    durationType: {
      type : String,
      enum: { values: [...Object.values(DURATIONTYPE)], message: 'Invalid duration type' },
    },
    personalRoom: {
      type: Boolean, 
      default: false,
    },
    rent: {
      type : Number
    },
    gender: {
      type: String,
      enum: { values: [...Object.values(GENDER)], message: 'Invalid gender' },
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String
    },
    contactPersonName : {
      type: String,
      required: true,
    },
    contactPersonNumber : {
      type: String,
      required: true,
    },
    Laundry : {
      type: Boolean,
      default: true,
      required: true
    },
    dietary: {
      type: String,
      enum: { values: [...Object.values(DIETARY)], message: 'Invalid dietary' },
    },
    accomodationType:{
      type: String,
      enum: { values: [...Object.values(ACCOMODATIONS)], message: 'Invalid accomodation' },
    },
    homeCity: {
      type: String,
    },
    homeState: {
      type: String,
    },
    homeCountry: {
      type: String,
    },
    startDate: {
       type : Date,
       required: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
      },
  },
  {
    timestamps: true,
  }
);

let ownerModel = model('Owner', ownerSchema, 'Owner');
module.exports = ownerModel;
