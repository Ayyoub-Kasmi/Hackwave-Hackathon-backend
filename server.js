/** Configure Environment variables */
require('dotenv').config();
const cors = require('cors');
const { corsRESTOptions } = require('./config/corsOptions');
const addChatSocket = require('./utils/addChatSocket');

/** Initialize Express */
const express = require('express');
const app = express();

/** Setup midleware */
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors(corsRESTOptions));

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
app.use('/api/students', studentRoutes);
app.use('api/teachers', teacherRoutes);
app.use('api/parents', parentRoutes);
app.use('api/groups', groupRoutes);
app.use('api/subjects', subjectRoutes);


/** Server */
const PORT = process.env.PORT || 5000;

const server = addChatSocket(app);

server.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});