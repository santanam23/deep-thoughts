//import the ggl tagged template function

const { gql } = require('apollo-server-express');

// create our tyeDefs = gql ``;
const typeDefs = gql `
    type Query {
        helloWorld: String
    }
`;
// export the typeDefs

module.exports = typeDefs;