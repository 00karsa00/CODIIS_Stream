import mongoose from 'mongoose';

const MONGOOSE_URL = process.env.MONGOOSE_URL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGOOSE_URL, options);
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Optional: Handling connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + MONGOOSE_URL);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

export default connectToDatabase;
