require('dotenv').config();
const mongoose = require('mongoose');
const DB = require('../models');
const { ENUM: { ROLE, ACCOMODATIONS, GENDER, DIETARY, DURATIONTYPE } } = require('../helpers/constant.helper');
const { logger } = require('../helpers');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/association')
  .then(() => {
    logger.info('Connected to MongoDB for seeding');
    seedDatabase();
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    // await DB.USER.deleteMany({});
    // await DB.OWNER.deleteMany({});
    // await DB.TENANT.deleteMany({});

    logger.info('Starting database seed...');

    // 1. Create Roles
    logger.info('Creating roles...');
    const roles = {};
    for (const roleName of Object.values(ROLE)) {
      let role = await DB.ROLE.findOne({ name: roleName });
      if (!role) {
        role = await DB.ROLE.create({
          name: roleName,
          description: `${roleName} role`,
          isActive: true,
        });
      }
      roles[roleName] = role;
    }
    logger.info('✓ Roles created');

    // 2. Create Users
    logger.info('Creating users...');
    const users = [];

    // Admin user
    let adminUser = await DB.USER.findOne({ email: 'admin@association.com' });
    if (!adminUser) {
      adminUser = await DB.USER.create({
        email: 'admin@association.com',
        firstName: 'Admin',
        lastName: 'User',
        mobile: '1234567890',
        callingCode: '+1',
        password: 'admin123',
        roleId: roles[ROLE.ADMIN]._id,
        isActive: true,
      });
      users.push(adminUser);
    }

    // Landlord users
    const landlordUsers = [];
    const landlordData = [
      { firstName: 'John', lastName: 'Smith', email: 'john@example.com', mobile: '1234567891' },
      { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@example.com', mobile: '1234567892' },
      { firstName: 'Mike', lastName: 'Davis', email: 'mike@example.com', mobile: '1234567893' },
    ];

    for (const data of landlordData) {
      let user = await DB.USER.findOne({ email: data.email });
      if (!user) {
        user = await DB.USER.create({
          ...data,
          callingCode: '+1',
          password: 'password123',
          roleId: roles[ROLE.LANDLORD]._id,
          isActive: true,
        });
      }
      landlordUsers.push(user);
    }
    users.push(...landlordUsers);
    logger.info('✓ Users created');

    // 3. Create Owner Listings
    logger.info('Creating owner listings...');
    const ownerListings = [
      {
        address: '123 Main Street, Downtown',
        city: 'Toronto',
        province: 'Ontario',
        googleMapLink: 'https://maps.google.com/?q=123+Main+Street+Toronto',
        availabelSpace: 2,
        alreadyLiving: 1,
        rent: 600,
        duration: 12,
        durationType: DURATIONTYPE.MONTH,
        accomodationType: ACCOMODATIONS.APARTMENT,
        gender: GENDER.MALE,
        dietary: DIETARY.VEG,
        Laundry: true,
        parking: true,
        personalRoom: false,
        contactPersonName: 'John Smith',
        contactPersonNumber: '1234567891',
        nearestBusStopDistance: 0.5,
        homeCity: 'Toronto',
        homeState: 'Ontario',
        homeCountry: 'Canada',
        startDate: new Date('2024-12-01'),
        isActive: true,
        isDeleted: false,
      },
      {
        address: '456 College Avenue',
        city: 'Toronto',
        province: 'Ontario',
        googleMapLink: 'https://maps.google.com/?q=456+College+Avenue+Toronto',
        availabelSpace: 1,
        alreadyLiving: 2,
        rent: 550,
        duration: 8,
        durationType: DURATIONTYPE.MONTH,
        accomodationType: ACCOMODATIONS.HOUSE,
        gender: GENDER.FEMALE,
        dietary: DIETARY.VEGAN,
        Laundry: true,
        parking: false,
        personalRoom: true,
        contactPersonName: 'Sarah Johnson',
        contactPersonNumber: '1234567892',
        nearestBusStopDistance: 0.3,
        homeCity: 'Toronto',
        homeState: 'Ontario',
        homeCountry: 'Canada',
        startDate: new Date('2024-11-15'),
        isActive: true,
        isDeleted: false,
      },
      {
        address: '789 University Boulevard',
        city: 'Vancouver',
        province: 'British Columbia',
        googleMapLink: 'https://maps.google.com/?q=789+University+Boulevard+Vancouver',
        availabelSpace: 3,
        alreadyLiving: 0,
        rent: 500,
        duration: 6,
        durationType: DURATIONTYPE.MONTH,
        accomodationType: ACCOMODATIONS.BASEMENT,
        gender: GENDER.MALE,
        dietary: DIETARY.NONVEG,
        Laundry: true,
        parking: true,
        personalRoom: false,
        contactPersonName: 'Mike Davis',
        contactPersonNumber: '1234567893',
        nearestBusStopDistance: 1.2,
        homeCity: 'Vancouver',
        homeState: 'British Columbia',
        homeCountry: 'Canada',
        startDate: new Date('2025-01-01'),
        isActive: true,
        isDeleted: false,
      },
      {
        address: '321 Student Lane',
        city: 'Toronto',
        province: 'Ontario',
        availabelSpace: 1,
        alreadyLiving: 1,
        rent: 650,
        duration: 12,
        durationType: DURATIONTYPE.MONTH,
        accomodationType: ACCOMODATIONS.APARTMENT,
        gender: GENDER.FEMALE,
        dietary: DIETARY.VEG,
        Laundry: true,
        parking: true,
        personalRoom: true,
        contactPersonName: 'Sarah Johnson',
        contactPersonNumber: '1234567892',
        nearestBusStopDistance: 0.8,
        homeCity: 'Toronto',
        homeState: 'Ontario',
        homeCountry: 'Canada',
        startDate: new Date('2024-12-10'),
        isActive: true,
        isDeleted: false,
      },
      {
        address: '555 Oak Street',
        city: 'Montreal',
        province: 'Quebec',
        availabelSpace: 2,
        alreadyLiving: 1,
        rent: 580,
        duration: 10,
        durationType: DURATIONTYPE.MONTH,
        accomodationType: ACCOMODATIONS.HOUSE,
        gender: GENDER.MALE,
        dietary: DIETARY.VEG,
        Laundry: true,
        parking: true,
        personalRoom: false,
        contactPersonName: 'John Smith',
        contactPersonNumber: '1234567891',
        nearestBusStopDistance: 0.6,
        homeCity: 'Montreal',
        homeState: 'Quebec',
        homeCountry: 'Canada',
        startDate: new Date('2025-01-15'),
        isActive: true,
        isDeleted: false,
      },
    ];

    const createdOwners = [];
    for (const listing of ownerListings) {
      const existing = await DB.OWNER.findOne({ 
        address: listing.address,
        city: listing.city 
      });
      if (!existing) {
        const owner = await DB.OWNER.create(listing);
        createdOwners.push(owner);
      }
    }
    logger.info(`✓ Created ${createdOwners.length} owner listings`);

    // 4. Create Student Users
    logger.info('Creating student users...');
    const studentUsers = [];
    const studentData = [
      { firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', mobile: '1234567894' },
      { firstName: 'Bob', lastName: 'Wilson', email: 'bob@example.com', mobile: '1234567895' },
      { firstName: 'Emma', lastName: 'Taylor', email: 'emma@example.com', mobile: '1234567896' },
      { firstName: 'David', lastName: 'Martinez', email: 'david@example.com', mobile: '1234567897' },
      { firstName: 'Lisa', lastName: 'Anderson', email: 'lisa@example.com', mobile: '1234567898' },
    ];

    for (const data of studentData) {
      let user = await DB.USER.findOne({ email: data.email });
      if (!user) {
        user = await DB.USER.create({
          ...data,
          callingCode: '+1',
          password: 'password123',
          roleId: roles[ROLE.USER]._id,
          isActive: true,
        });
      }
      studentUsers.push(user);
    }
    logger.info('✓ Student users created');

    // 5. Create Tenant Requests
    logger.info('Creating tenant requests...');
    const tenantRequests = [
      {
        totalPerson: 1,
        duration: 12,
        durationType: DURATIONTYPE.MONTH,
        instituteName: 'University of Toronto',
        nearByLocation: 'Downtown',
        city: 'Toronto',
        province: 'Ontario',
        rent: 600,
        gender: GENDER.FEMALE,
        dietary: DIETARY.VEG,
        laundry: true,
        personalRoom: true,
        accomodationType: ACCOMODATIONS.APARTMENT,
        contactPersonName: 'Alice Brown',
        contactPersonEmail: 'alice@example.com',
        contactPersonNumber: '1234567894',
        contactPersonCallingCode: '+1',
        homeCity: 'Toronto',
        homeState: 'Ontario',
        homeCountry: 'Canada',
        startDate: new Date('2024-12-01'),
        userId: studentUsers[0]._id,
        isActive: true,
        isDeleted: false,
      },
      {
        totalPerson: 2,
        duration: 8,
        durationType: DURATIONTYPE.MONTH,
        instituteName: 'University of Toronto',
        nearByLocation: 'College Street',
        city: 'Toronto',
        province: 'Ontario',
        rent: 550,
        gender: GENDER.MALE,
        dietary: DIETARY.NONVEG,
        laundry: true,
        personalRoom: false,
        accomodationType: ACCOMODATIONS.HOUSE,
        contactPersonName: 'Bob Wilson',
        contactPersonEmail: 'bob@example.com',
        contactPersonNumber: '1234567895',
        contactPersonCallingCode: '+1',
        homeCity: 'Toronto',
        homeState: 'Ontario',
        homeCountry: 'Canada',
        startDate: new Date('2024-11-15'),
        userId: studentUsers[1]._id,
        isActive: true,
        isDeleted: false,
      },
      {
        totalPerson: 1,
        duration: 6,
        durationType: DURATIONTYPE.MONTH,
        instituteName: 'University of British Columbia',
        nearByLocation: 'UBC Campus',
        city: 'Vancouver',
        province: 'British Columbia',
        rent: 500,
        gender: GENDER.FEMALE,
        dietary: DIETARY.VEGAN,
        laundry: true,
        personalRoom: true,
        accomodationType: ACCOMODATIONS.APARTMENT,
        contactPersonName: 'Emma Taylor',
        contactPersonEmail: 'emma@example.com',
        contactPersonNumber: '1234567896',
        contactPersonCallingCode: '+1',
        homeCity: 'Vancouver',
        homeState: 'British Columbia',
        homeCountry: 'Canada',
        startDate: new Date('2025-01-01'),
        userId: studentUsers[2]._id,
        isActive: true,
        isDeleted: false,
      },
      {
        totalPerson: 1,
        duration: 10,
        durationType: DURATIONTYPE.MONTH,
        instituteName: 'McGill University',
        nearByLocation: 'Downtown Montreal',
        city: 'Montreal',
        province: 'Quebec',
        rent: 580,
        gender: GENDER.MALE,
        dietary: DIETARY.VEG,
        laundry: true,
        personalRoom: false,
        accomodationType: ACCOMODATIONS.HOUSE,
        contactPersonName: 'David Martinez',
        contactPersonEmail: 'david@example.com',
        contactPersonNumber: '1234567897',
        contactPersonCallingCode: '+1',
        homeCity: 'Montreal',
        homeState: 'Quebec',
        homeCountry: 'Canada',
        startDate: new Date('2025-01-15'),
        userId: studentUsers[3]._id,
        isActive: true,
        isDeleted: false,
      },
      {
        totalPerson: 1,
        duration: 12,
        durationType: DURATIONTYPE.MONTH,
        instituteName: 'University of Toronto',
        nearByLocation: 'Kensington Market',
        city: 'Toronto',
        province: 'Ontario',
        rent: 650,
        gender: GENDER.FEMALE,
        dietary: DIETARY.VEG,
        laundry: true,
        personalRoom: true,
        accomodationType: ACCOMODATIONS.APARTMENT,
        contactPersonName: 'Lisa Anderson',
        contactPersonEmail: 'lisa@example.com',
        contactPersonNumber: '1234567898',
        contactPersonCallingCode: '+1',
        homeCity: 'Toronto',
        homeState: 'Ontario',
        homeCountry: 'Canada',
        startDate: new Date('2024-12-10'),
        userId: studentUsers[4]._id,
        isActive: true,
        isDeleted: false,
      },
    ];

    const createdTenants = [];
    for (const request of tenantRequests) {
      const existing = await DB.TENANT.findOne({
        contactPersonEmail: request.contactPersonEmail,
        city: request.city,
      });
      if (!existing) {
        const tenant = await DB.TENANT.create(request);
        // Generate sharing message
        const { generateTenantMessage } = require('../helpers/common.helper');
        tenant.sharingMessage = generateTenantMessage(tenant);
        await tenant.save();
        createdTenants.push(tenant);
      }
    }
    logger.info(`✓ Created ${createdTenants.length} tenant requests`);

    logger.info('✓ Database seed completed successfully!');
    logger.info('\n=== Test Credentials ===');
    logger.info('Admin: admin@association.com / admin123');
    logger.info('Landlords: john@example.com, sarah@example.com, mike@example.com / password123');
    logger.info('Students: alice@example.com, bob@example.com, emma@example.com, david@example.com, lisa@example.com / password123');
    logger.info('=======================\n');

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
}

