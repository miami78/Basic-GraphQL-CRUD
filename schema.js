const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLSchema } = require("graphql");

//BookType Specifications
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

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})