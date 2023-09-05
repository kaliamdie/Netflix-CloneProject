const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected: ', result.connection.host);
    } catch (err) {
        console.error('Mongo error: ', err);
    }
};

module.exports = connectDB;
