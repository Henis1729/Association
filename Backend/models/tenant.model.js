const { hash } = require('bcryptjs');
const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { required } = require('joi');
const { ENUM: { ACCOMODATIONS, GENDER, DIETARY, DURATIONTYPE  } } = require('../helpers/constant.helper');

const tenantSchema = new Schema(
  {
    totalPerson: {
        type : Number,
        default: 1
    },
    duration: {
      type : Number,
    },
    instituteName: {
      type : String,
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
    contactPersonName : {
      type: String,
      required: true,
    },
    contactPersonEmail : {
      type: String,
      required: true,
    },
    contactPersonNumber : {
      type: String,
      required: true,
    },
    laundry : {
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

let tenentModel = model('Tenant', tenantSchema, 'Tenant');
module.exports = tenentModel;
