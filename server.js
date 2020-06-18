const express = require('express');
const quizRouter = require('./src/routes/quizzes');
const connectDB = require('./config/db');

// connect to databse
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// initialize middleware
app.use(express.json({ extended: false })); // converts req.body to json

// routes
app.use('/api/quiz', quizRouter);

app.listen(PORT, () => {
    console.log('API server started at port: ' + PORT);
});
