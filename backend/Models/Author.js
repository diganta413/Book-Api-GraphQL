const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: {
        type: Array
    },
    age: {
        type:  Number,
        required: true
    }
})

module.exports = mongoose.model("Author",schema)