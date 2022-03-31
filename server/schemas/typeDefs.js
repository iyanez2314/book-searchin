// * importing the gql tagged template function 
const { gql }= require('apollo-server-express');

// * creating our TypeDefs
const TypeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [savedBooks]
    }

    type Auth {
        token: ID!
        user: User
    }
`


// * exporting the typeDefs
module.exports = TypeDefs;