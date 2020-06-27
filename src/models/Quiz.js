const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //the user is itself a mongoose model
        ref: 'users',
    },
    name: {
        type: String,
        required: true,
    },
    quizData: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('quiz', QuizSchema);
