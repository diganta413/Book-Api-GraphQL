const express = require("express")
const graphql = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/schema")


const app = express()

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