/** Setup CORS */
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000', 'localhost:3000']

const corsRESTOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

// setup cors for socket.io with multiple origins
const corsSocketOptions = {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
};

module.exports = { corsRESTOptions, corsSocketOptions };