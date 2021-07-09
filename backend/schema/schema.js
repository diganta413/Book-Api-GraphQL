const graphql = require("graphql")
const _ = require("lodash")
const {GraphQLID,GraphQLInt,GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLList} = graphql
const author_model = require("../Models/Author")
const book_model = require("../Models/Book")

const Book = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: author,
            resolve(parent,args){
                //return _.find(authors,{id: parent.authorid})
                return author_model.findById(parent.authorid)
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
                //return _.filter(Books,{authorid: parent.id})
                return book_model.find({authorid: parent.id })
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
                return book_model.findById(args.id)
            }
        },
        author: {
            type: author,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return author_model.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(Book),
            resolve(parent,args){
                return book_model.find()
            }
        },
        authors: {
            type: new GraphQLList(author),
            resolve(parent){
                return author_model.find()
            }
        }
    }

})

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        add_book: {
            type: Book,
            args: {name: {type: GraphQLString},genre: {type: GraphQLString},authorid: {type: GraphQLID}},
            resolve(parent,args){
                const new_book = new book_model({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid

                })
                return new_book.save()
            }
        },
        add_author: {
            type: author,
            args: {name: {type: GraphQLString},age: {type: GraphQLInt}},
            resolve(parent,args){
                const new_author = new author_model({
                    name: args.name,
                    age: args.age
                })
                return new_author.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
})