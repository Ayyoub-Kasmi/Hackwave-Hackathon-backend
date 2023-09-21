/** Configure Environment variables */
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')

/** Initialize Express */
const express = require('express');
const app = express();

/** Setup midleware */
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors(corsOptions));

/** Routes */
const authRoutes = require('./auth/authRoutes');
// const userRoutes = require('./user/userRoutes');
// const threadRoutes = require('./threads/threadRoutes');
// const answerRoutes = require('./routes/answerRoutes');

app.get('/', (req, res) => {
    res.send("Welcome to the CSE Forums platform!");
});

// app.use(answerRoutes);
app.use('/user', userRoutes);
app.use('/threads', threadRoutes);
app.use(authRoutes);


/** Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});