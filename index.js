// サーバーを起動させるための処理
// subscriptionを利用するために、Pubsubのインスタンスを作成する

const {ApolloServer, PubSub} = require('apollo-server');
const { subscribe } = require('graphql');
const db = require('./db')
const Query = require('./resolver/Query')
const Subscription = require('./resolver/Subscription')
const typeDefs = require('./schema')

// PubSubのインスタンスを作成、サブスクリプションが利用可能になる
const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
        Subscription,
    },
    context: {
        db,
        pubsub
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});