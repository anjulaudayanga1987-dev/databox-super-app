const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth'); // අලුත් කොටස

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoute); // Register වලට යන පාර

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running!");
});