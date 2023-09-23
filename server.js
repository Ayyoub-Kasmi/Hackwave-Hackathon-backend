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
const studentRoutes = require('./src/student/studentRoutes');
const parentRoutes = require('./src/parent/parentRoutes.js');
const teacherRoutes = require('./src/teacher/teacherRoutes.js');
const groupRoutes = require('./src/group/groupRoutes.js');
const subjectRoutes = require('./src/subject/subjectRoutes.js');

app.get('/', (req, res) => {
    res.send("Welcome to the CSE Forums platform!");
});

/**  @Routes */
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/parents', parentRoutes);
app.use('/groups', groupRoutes);
app.use('/subjects', subjectRoutes);


/** Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});