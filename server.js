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
const studentRoutes = require('./student/studentRoutes');
const parentRoutes = require('./parent/parentRoutes.js');
const teacherRoutes = require('./teacher/teacherRoutes.js');
const groupRoutes = require('./group/groupRoutes.js');
const subjectRoutes = require('./subject/subjectRoutes.js');

app.get('/', (req, res) => {
    res.send("Welcome to the CSE Forums platform!");
});

/**  @Routes */
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/parent', parentRoutes);
app.use('/group', groupRoutes);
app.use('/subject', subjectRoutes);


/** Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});