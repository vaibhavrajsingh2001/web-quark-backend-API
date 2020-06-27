const express = require('express');
const { check, validationResult } = require('express-validator');
const quizRouter = express.Router();

const auth = require('../middleware/auth');
const Quiz = require('../models/Quiz');

// get all quizzes
quizRouter.get('/', async (req, res) => {
    try {
        // get all quizzes (but only name & id)
        const quizzes = await Quiz.find({}, 'name _id').sort({
            date: -1,
        });
        res.json(quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// get individual quiz using id
quizRouter.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// create a new quiz
quizRouter.post(
    '/',
    [
        auth,
        check('name', 'Name is required.').not().isEmpty(),
        check('quizData', 'You need to enter some questions.').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, quizData } = req.body;
        try {
            const newQuiz = new Quiz({
                name,
                quizData,
                user: req.user.id,
            });

            const quiz = await newQuiz.save();
            res.json(quiz);
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = quizRouter;
