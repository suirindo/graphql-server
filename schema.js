const{gql} = require('apollo-server');

const typeDefs = gql`
type Query {
    # nullの可能性がないリストで値はnullではない文字列型
    posts(query: String): [Post!]!
}

type Mutation {
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
}

# サブスクリプション
type Subscription {
    post: PostSubscriptionPayload!
}

input CreatePostInput {
    title: String!
    author: String!
}

input UpdatePostInput {
    title: String
    author: String!
}

type Post {
    id: ID!
    title: String!
    author: String!
}

enum MutationType {
    CREATED
    UPDATED
    DELETED
}

#サブスクリプションのフィールド
type PostSubscriptionPayload {
    mutation: MutationType!
    data: Post!
}
`
module.exports = typeDefs;