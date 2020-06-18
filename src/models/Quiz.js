const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("quiz", QuizSchema);
