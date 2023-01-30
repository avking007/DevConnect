const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('mongo connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
