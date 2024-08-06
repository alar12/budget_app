const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const app = express();
const Routes = require("./routes/route.js");
const SavingsPlan = require("./models/SavingsPlan"); // Import the SavingsPlan model

const PORT = process.env.PORT || 5000;

dotenv.config(); // Load environment variables from .env file

app.use(express.json({ limit: '100mb' })); // Middleware to parse JSON requests with a limit
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing

// Connect to MongoDB using the connection URL from environment variables
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Use the defined routes for the application
app.use('/', Routes);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});