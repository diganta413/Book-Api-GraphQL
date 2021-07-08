const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: {
        type: Array
    }
})

module.exports = mongoose.model("Author",schema)