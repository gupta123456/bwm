
const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({ 
  cloud_name: 'dltwobcyu', 
  api_key: '145719238317824', 
  api_secret: 'PzLkvdowWPianMHUrrSPaMDZT-Q'
});

exports.cloudUpload = file => cloudinary.uploader.upload(file)

