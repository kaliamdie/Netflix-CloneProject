const mongoose = require('mongoose');

const mongoConfig = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected: ', result.connection.host);
  } catch (err) {
    console.log('Mongo error: ', err);
  }
};

module.exports = mongoConfig;
