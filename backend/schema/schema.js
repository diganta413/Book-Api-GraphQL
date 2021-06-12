const graphql = require("graphql")
const _ = require("lodash")

const {GraphQLID,GraphQLInt,GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLList} = graphql

var Books = [
    {id: "1",name: "3 idots",genre: "action",authorid: "1"},
    {id: "2",name: "PK",genre: "romantic",authorid: "2"}
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
        genre: {type: GraphQLString},
        author: {
            type: author,
            resolve(parent,args){
                return _.find(authors,{id: parent.authorid})
            }
        }
    })
})

const author = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        books: {
            type: new GraphQLList(Book),
            resolve(parent,args){
                return _.filter(Books,{authorid: parent.id})
            }
        }
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