const { createServer } = require('@graphql-yoga/node');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const CV_ADDED = 'CV_ADDED';
const CV_UPDATED = 'CV_UPDATED';
const CV_DELETED = 'CV_DELETED';
export const Subscription= {
    cvAdded: {
        subscribe: () => pubsub.asyncIterator([CV_ADDED])
    },
    cvUpdated: {
        subscribe: () => pubsub.asyncIterator([CV_UPDATED])
    },
    cvDeleted: {
        subscribe: () => pubsub.asyncIterator([CV_DELETED])
    }
};
