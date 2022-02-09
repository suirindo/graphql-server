// Subscriptionのリゾルバ関数ではSubscriptionのイベントを非同期でリッスンするAsyncIteratorを
// 戻り値として指定する必要がある


const Subscription = {
    post: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('post')
        }
    }
}
module.exports = Subscription