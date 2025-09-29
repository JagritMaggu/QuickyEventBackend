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
  "https://quicky-event-tracker-dwyo.vercel.app"
];
app.use(cors({
    origin: allowedOrigins,
    credentials:true,
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes)
app.use("/api/event", eventRoutes)
mongoose.connect(process.env.MONGO_URI);