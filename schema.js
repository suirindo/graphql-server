const{gql} = require('apollo-server');

const typeDefs = gql`
typw Query {
    # nullの可能性がないリストで値はnullではない文字列型
    posts(query: String): [Post!]!
}

type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
}

# サブスクリプション



`