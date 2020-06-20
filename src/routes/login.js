const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const loginRouter = express.Router();

loginRouter.post(
    '/',
    [
        check('email', 'please enter a valid email').isEmail(),
        check('password', 'password is required').exists(),
    ],
    async (req, res) => {
        // check validation by express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            // error message in case of wrong credentials
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const matches = await bcrypt.compare(password, user.password);

            // error message for wrong password
            if (!matches) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json(token);
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error!!');
        }
    }
);

module.exports = loginRouter;
