const express = require("express")
const graphql = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()
const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.k1sfa.mongodb.net/GraphQl?retryWrites=true&w=majority`
,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once("open",() => {
    console.log("Mongodb connected")
})

app.get("/",(req,res) => {
    res.send("Welcome to graphql")
})

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000,() => {
    console.log("Listening to port 5000")
})