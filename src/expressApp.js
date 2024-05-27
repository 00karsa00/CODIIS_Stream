import express from 'express';
import userRouter from './routes/users.routes.js';
import adminRouter from './routes/admin.routes.js';
import planRouter from './routes/plans.routes.js';
import videoRouter from './routes/video.routes.js';
import groupRouter from './routes/group.routes.js';
import favouriteRouter from './routes/favourite.routes.js';
import connectToDatabase from './mongoose.js';

const app = express();

// Connect to the database
connectToDatabase();

// Middleware to parse JSON requests
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static('./public'));

// Routes setup
app.use('/user', userRouter);
app.use("/admin", adminRouter);
app.use("/plan", planRouter);
app.use("/video", videoRouter);
app.use("/group", groupRouter);
app.use("/favourite", favouriteRouter);

app.get('/', (req, res) =>{
  res.send("Welcome!! server is running")
});

// Fallback route for non-existing endpoints
app.use('*', (req, res) => {
  return res.status(404).json({
    error: true,
    message: 'API endpoint not found',
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.status || 500).json({
    error: true,
    message: error.message,
  });
});

export default app;
