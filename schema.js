const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

//Array of authors
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]


//Array of books
const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

// BookType Specifications
const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        // All attributes of the book must not be null
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
    })
});

// Queries
const RootQueryType = new GraphQLObjectType({
    name: "Queries",
    description: "All queries can be found here",
    fields: () => ({
        books: {
            type: GraphQLList(BookType),
            description: "List of all books",
            resolve: () => books
        }
    })
})

// Mutations
const RootMutationType = new GraphQLObjectType({
    name: "Mutations",
    description: "Makes changes to all my data",
    fields: () => ({
        //Add new book
        addBook: {
            type: BookType,
            description: "Add a new Book",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const addedBook = {
                    id: books.length + 1,
                    name: args.name,
                    authorId: args.authorId
                }
                books.push(addedBook);
                return addedBook
            }
        }
    })
})
module.exports = new GraphQLSchema({
    query: RootQueryType,
    RootMutationType
})