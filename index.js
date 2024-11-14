require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/Register");
const authRoutes = require("./routes/Login");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to User database");
  })

// routes
app.use("/api/register", userRoutes);
app.use("/api/login", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port http://localhost:${port}`));

