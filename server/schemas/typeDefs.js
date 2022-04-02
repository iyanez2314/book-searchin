// * importing the gql tagged template function 
const { gql }= require('apollo-server-express');

// * creating our TypeDefs
const TypeDefs = gql`
    type User {
      _id: ID
      username: String
      email: String
      password: String
      savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Book {
      bookId: ID
      authors: [String]
      description: String
      title: String
      link: String
      image: String
    }

    type Query {
      users: [User]
      me: User
      }

      type Mutation {
        login(email: String!, password: String!, username: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: ID, authors: [String], description: String, image: String, link: String, title: String): User
        removeBook(bookId: String!): User
      }
`


// * exporting the typeDefs
module.exports = TypeDefs;