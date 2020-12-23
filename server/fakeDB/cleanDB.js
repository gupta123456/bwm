
const mongoose = require('mongoose');
const config = require('../config');
const FakeDB = require('./FakeDB');

mongoose.connect('mongodb+srv://testtest:demo@cluster0.omdcp.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, async () => {
  const fakeDB = new FakeDB();
  console.log('Starting populating DB');
  await fakeDB.populate();
  await mongoose.connection.close();
  console.log('DB has been populated!');
});