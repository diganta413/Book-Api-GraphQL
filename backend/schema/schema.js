const graphql = require("graphql")
const _ = require("lodash")

const {GraphQLID,GraphQLInt,GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql

var Books = [
    {id: "1",name: "3 idots",genre: "action"},
    {id: "2",name: "PK",genre: "romantic"}
]

var authors = [
    {id: "1",name: "Digu"},
    {id: "2",name: "Diganta"}
]

const Book = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const author = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})

const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type: Book,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(Books,{id: args.id})
            }
        },
        author: {
            type: author,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id: args.id})
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: rootQuery
})