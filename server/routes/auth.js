const router = require('express').Router();
const User = require('../models/User');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        // අලුත් යුසර් කෙනෙක් නිර්මාණය කිරීම
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // ඩේටාබේස් එකේ සේව් කිරීම
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});
// LOGIN
router.post("/login", async (req, res) => {
    try {
        // 1. යූසර් නම තිබේදැයි බැලීම
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json("User not found!");

        // 2. පාස්වර්ඩ් එක ගැලපේදැයි බැලීම
        if (user.password !== req.body.password) {
            return res.status(400).json("Wrong Credentials!");
        }

        // 3. හරිනම්, පාස්වර්ඩ් එක හැර අනෙක් විස්තර යැවීම
        const { password, ...others } = user._doc;
        res.status(200).json(others);
        
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;