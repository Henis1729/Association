const { hash } = require('bcryptjs');
const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { required } = require('joi');
const { ENUM: { ACCOMODATIONS, GENDER, DIETARY, DURATIONTYPE } } = require('../helpers/constant.helper');

const tenantSchema = new Schema(
  {
    totalPerson: {
      type: Number,
      default: 1,
      index: true,
    },
    duration: {
      type: Number,
      index: true,
    },
    instituteName: {
      type: String,
      index: true,
    },
    durationType: {
      type: String,
      enum: { values: [...Object.values(DURATIONTYPE)], message: 'Invalid duration type' },
    },
    personalRoom: {
      type: Boolean,
      default: false,
      index: true,
    },
    rent: {
      type: Number,
      index: true,
    },
    gender: {
      type: String,
      enum: { values: [...Object.values(GENDER)], message: 'Invalid gender' },
      index: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    province: {
      type: String,
      required: true,
      index: true,
    },
    nearByLocation: {
      type: String,
    },
    contactPersonName: {
      type: String,
      required: true,
    },
    contactPersonEmail: {
      type: String,
      required: true,
    },
    contactPersonNumber: {
      type: String,
      required: true,
    },
    contactPersonCallingCode: {
      type: String,
      required: true,
    },
    laundry: {
      type: Boolean,
      default: true,
      required: true
    },
    dietary: {
      type: String,
      enum: { values: [...Object.values(DIETARY)], message: 'Invalid dietary' },
      index: true,
    },
    accomodationType: {
      type: String,
      enum: { values: [...Object.values(ACCOMODATIONS)], message: 'Invalid accomodation' },
      index: true,
    },
    homeCity: {
      type: String,
      index: true,
    },
    homeState: {
      type: String,
      index: true,
    },
    homeCountry: {
      type: String,
      index: true,
    },
    sharingMessage: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

let tenentModel = model('Tenant', tenantSchema, 'Tenant');
module.exports = tenentModel;
