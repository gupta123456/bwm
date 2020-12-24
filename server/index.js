
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const { provideErrorHandler } = require('./middlewares');
const path = require('path');

// routes
const rentalRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const imageUploadRoutes = require('./routes/image-upload');
// const reviewRoutes = require('./routes/review');
const { onlyAuthUser } = require('./controllers/users');

// models
require('./models/rental');
require('./models/user');
require('./models/booking');
require('./models/cloudinary-image');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://testtest:demo@cluster0.omdcp.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, () => {
  console.log('Connected to DB!')
});

// Middleware
app.use(bodyParser.json());
app.use(provideErrorHandler);

app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  const user = res.locals.user
  return res.json({message: `Super secret message to: ${user.username}`})
})

// Api Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/image-upload', imageUploadRoutes);
// app.use('/api/v1/reviews',reviewRoutes);


if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(distPath, 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT);
})
