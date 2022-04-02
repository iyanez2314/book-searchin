import { gql } from '@apollo/client';

export const QUERY_ALL = gql`
query Users {
    users {
        username
        email
        savedBooks {
            authors
            title
        }
    }
}
`;

export const QUERY_ME = gql`
query Me {
    me{
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}
`;