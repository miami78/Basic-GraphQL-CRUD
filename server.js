const express = require('express');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

const cors = require('cors');
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('Server is running on port 3000..');
});