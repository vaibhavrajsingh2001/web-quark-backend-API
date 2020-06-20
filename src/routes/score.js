const express = require('express');

const auth = require('../middleware/auth');
const User = require('../models/User');

const scoreRouter = express.Router();

// get leaderboard
scoreRouter.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'name score').sort({ score: -1 });
        if (!users) {
            return res.status(400).send('There are no users registered');
        }
        res.json(users);
    } catch (err) {}
});

// add points to a user's total score
scoreRouter.post('/', auth, async (req, res) => {
    const _id = req.user.id;
    // find the user
    let user = await User.findById(_id, 'name score');
    if (!user) {
        return res.status(404).json({ msg: 'User not found!' });
    }

    // add points to user's score
    const { points } = req.body;
    try {
        user.score += points;
        await user.save();
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error!');
    }
});

module.exports = scoreRouter;
