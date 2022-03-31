// * importing the gql tagged template function 
const { gql }= require('apollo-server-express');

// * creating our TypeDefs
const TypeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
      }

      type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
      }
`


// * exporting the typeDefs
module.exports = TypeDefs;