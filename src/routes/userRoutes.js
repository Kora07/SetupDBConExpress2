const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST: Create a new user
router.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
        }
        if (err.code === 11000) {
        return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
