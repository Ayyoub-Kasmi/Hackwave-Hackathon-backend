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

/** @import */
const authRoutes = require('./auth/authRoutes.js'); // make sure to rename this controller and routes to student routes 
const groupRoutes = require('./group/groupRoutes.js');
const parentRoutes = require('./parent/parentRoutes.js');

app.get('/', (req, res) => {
    res.send("Welcome to the CSE Forums platform!");
});


/**  @Routes */



app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/parent', parentRoutes);
// app.use(authRoutes);


/** Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});