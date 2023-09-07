require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = 8000;
const connectDB = require("./config")
const router = require("./routes/router");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Connect to the database
connectDB();

// Routes
app.use(router);

app.get("/", (req, res) => {
    res.json({ message: "hello" });
});

app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT);
});
