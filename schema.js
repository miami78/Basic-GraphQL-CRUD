const { default: axios } = require("axios");
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInputObjectType } = require("graphql");

// BookType Specifications
const BookType = new GraphQLObjectType({
    name : "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        // All attributes of the book must not be null
        id : { type : GraphQLNonNull(GraphQLInt) } ,
        name : { type : GraphQLNonNull(GraphQLString)} ,
        authorId : { type: GraphQLNonNull(GraphQLInt)}
    })
});

// Queries
const RootQueryType = new GraphQLObjectType({
    name: "Queries",
    description: "All queries can be found here",
    fields: () =>({
        books: {
            type: GraphQLList(BookType),
            description: "List of all books",
            resolve: () => axios.get("http://localhost:3000/books")
            .then(res => res.data)
        }
    })
})

// Mutations
const RootMutationType = new GraphQLObjectType({
    name: "Mutations",
    description: "Makes changes to all my data",
    fields: () =>({
        //Add new book
        addBook : {
            type : BookType,
            description : "Add a new book",
            args : {
                name : {type : GraphQLNonNull(GraphQLString)},
                authorId : {type : GraphQLNonNull(GraphQLString)}
            },
            resolve : (parent, args) => axios.post("http://localhost:3000/books", {
                id: books.length + 1,
                name: args.name,
                authorId: args.authorId
            })
            .then(res => res.data)
        }
    })
})
module.exports = new GraphQLSchema({
    query: RootQueryType,
    RootMutationType
})