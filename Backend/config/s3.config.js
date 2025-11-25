//* TEMPORARILY DISABLED - S3 service
// const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const { logger } = require('../helpers');
const env = require('./env.config');

//* TEMPORARILY DISABLED - S3 service
// if (!env.SECRET_KEY && !env.ACCESSKEYID) return module.exports = null;

//* TEMPORARILY DISABLED - S3 service
// const s3 = new S3Client({
//   region: env.REGION,
//   credentials: {
//     // secretAccessKey: env.SECRET_KEY,
//     // accessKeyId: env.ACCESSKEYID,
//   },
// });
  
//* TEMPORARILY DISABLED - S3 service
// verify s3 connection
// ;(async function() {
//   try {
//     const buckets = (await s3.send(new ListBucketsCommand({}))).Buckets;
//
//     if (!buckets.find(_b_ => _b_.Name === env.BUCKET)) 
//       logger.error(`✘ BUCKET NOT FOUND, BUCKET NAME: '${env.BUCKET}'`);
//     else logger.info(`✔ CONNECTED TO S3, READY TO UPLOAD FILES TO BUCKET: '${env.BUCKET}'`);
//     
//   } catch (error) {
//     logger.error(`✘ UNABLE TO CONNECT TO S3`);
//     logger.error(error);
//   }
// })();

//* Return null so S3-dependent code can check if it exists
logger.info('⚠ S3 SERVICE IS DISABLED - File uploads will use local storage');
module.exports = null;