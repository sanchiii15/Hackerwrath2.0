const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("📡 Connecting to MongoDB...");
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not set');
    }
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;


