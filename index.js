// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');

// const eventRoutes = require('./Routes/EventRoute.js');
// const userRoutes = require('./Routes/UserRoute.js');

// const app = express();
// const server = http.createServer(app);

// // --- PORT ---
// const PORT = process.env.PORT || 8002;

// // --- CORS ---
// const allowedOrigins = [
//   "http://localhost:5173",                        // local dev
//   "https://quicky-event-frontend-n739.vercel.app" // deployed frontend
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow Postman / curl
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // allow cookies/session
// }));

// // --- MIDDLEWARE ---
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // --- ROUTES ---
// app.use('/api', userRoutes);
// app.use('/api/event', eventRoutes);

// // --- DATABASE ---
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected successfully"))
// .catch(err => console.error("MongoDB connection error:", err));

// // --- START SERVER ---
// server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));




require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const http = require('http')
const cookieParser = require("cookie-parser");
const server = http.createServer(app);
const port = process.env.PORT
const mongoose = require("mongoose")
const eventRoutes =require("./Routes/EventRoute.js")
const userRoutes =require("./Routes/UserRoute.js")

server.listen(port,()=>console.log(`server is running at port:${port}`))
const allowedOrigins = [
  "http://localhost:5173",
  "https://quicky-event-frontend-n739.vercel.app"
];
app.use(cors({
    origin: allowedOrigins,
    credentials:true,
}));
app.use(express.json())
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none"
  }
}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes)
app.use("/api/event", eventRoutes)
mongoose.connect(process.env.MONGO_URI);