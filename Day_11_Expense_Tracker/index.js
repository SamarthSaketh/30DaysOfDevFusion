require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const Data = require("./models/Data");

const app = express();

// Mongoose settings
mongoose.set('debug', true);
mongoose.set('bufferCommands', false);

// Middleware setup
app.use(cors()); // Enable CORS globally
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000
})
.then(() => {
    console.log('✅ Connected to MongoDB');

    // ✅ Routes only start after successful DB connection

    // Serve HTML
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Add Expense
    app.post("/add", async (req, res) => {
        const { category_select, amount_input, info, date_input } = req.body;

        console.log("Received Data:", { category_select, amount_input, info, date_input });

        if (!category_select || !amount_input || !info || !date_input) {
            return res.status(400).send("All fields are required.");
        }

        const data = new Data({
            Category: category_select,
            Amount: amount_input,
            Info: info,
            Date: new Date(date_input),
        });

        try {
            const savedData = await data.save();
            console.log("✅ Record inserted:", savedData);
            res.status(200).json(savedData);
        } catch (err) {
            console.error("❌ Error saving data:", err);
            res.status(500).send("Error saving data to the database.");
        }
    });

    // Get all Expenses
    app.get('/get-expenses', async (req, res) => {
        try {
            const expenses = await Data.find();
            res.status(200).json(expenses);
        } catch (err) {
            console.error("❌ Error fetching data:", err);
            res.status(500).send("Error fetching data from the database.");
        }
    });

    // Start server
    app.listen(5000, () => {
        console.log("🚀 Server is running at http://localhost:5000");
    });

})
.catch((err) => {
    console.error('❌ Database connection error:', err);
});
