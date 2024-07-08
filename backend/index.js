const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const app = express();
const Routes = require("./routes/route.js");
const SavingsPlan = require("./models/SavingsPlan"); // Import the SavingsPlan model

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '100mb' }));
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});

// Schedule a job to run every 5 seconds
cron.schedule('*/5 * * * * *', async () => {
    try {
        const plans = await SavingsPlan.find();
        const currentMonth = new Date().getMonth();
        plans.forEach(async (plan) => {
            if (plan.currentMonth < plan.monthsRequired) {
                const isCurrentMonth = plan.currentMonth === currentMonth % plan.monthsRequired;
                if (isCurrentMonth) {
                    let amountToSave = plan.amountToSavePerMonth;
                    if (plan.currentMonth === plan.monthsRequired - 1) {
                        amountToSave = plan.amount - plan.wallet;
                    }

                    plan.wallet += amountToSave;
                    plan.currentMonth += 1;
                    await plan.save();
                }
            }
        });
        console.log('Savings plans updated');
    } catch (error) {
        console.error('Error updating savings plans:', error);
    }
});
