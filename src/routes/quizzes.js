const express = require('express');
const quizRouter = express.Router();

const Quiz = require('../models/Quiz');

// get quizzes using id
quizRouter.get('/:id', (req, res) => {
    res.send('Get object number: ' + req.params.id);
});

// create a new quiz
quizRouter.post('/', async (req, res) => {
    const { name, questions } = req.body;
    try {
        const newQuiz = new Quiz({
            name,
            questions,
        });

        const quiz = await newQuiz.save();
        res.json(quiz);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = quizRouter;
