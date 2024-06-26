import { mock_database } from "../src/tables";
import { CV } from "../src/tables";
import { Subscription } from "./Subscription";
const { createServer } = require('@graphql-yoga/node');
const { PubSub } = require('graphql-subscriptions');
const CV_ADDED = 'CV_ADDED';
const CV_UPDATED = 'CV_UPDATED';
const CV_DELETED = 'CV_DELETED';
const pubsub = new PubSub();
export const Mutation = {
  addCV: (parent, args, context): CV => {
    const newCV: CV = {
      id: String(mock_database.cvs.length + 1),
      name: args.input.name,
      age: args.input.age,
      job: args.input.job,
      ownerId: args.input.ownerId,
      skillIds: args.input.skillIds,
    };

    mock_database.cvs.push(newCV);
    pubsub.publish(CV_ADDED, { cvAdded: newCV });
    console.log(mock_database.cvs);
    return newCV;
  },

  updateCV: (parent, args, context): CV | null => {
    const id = args.input.id;
    const existingCVIndex = mock_database.cvs.findIndex((cv) => cv.id === id);

    if (existingCVIndex === -1) {
      throw new Error("CV not found.");
    }

    // Check if the user exists
    const userExists = mock_database.users.some(
      (user) => user.id === args.input.ownerId
    );
    if (!userExists) {
      throw new Error("The specified user does not exist.");
    }
    const skillIds = args.input.skillIds;
    // Check if each skill exists
    const skillsExist = skillIds.every((skillId) =>
      mock_database.skills.some((skill) => skill.id === skillId)
    );
    if (!skillsExist) {
      throw new Error("Some specified skills do not exist.");
    }
    const updateCV = {
      ...mock_database.cvs[existingCVIndex],
      ...args.input,
    };

    mock_database.cvs[existingCVIndex] = updateCV;
    pubsub.publish(CV_UPDATED, { cvUpdated: updateCV });
    return mock_database.cvs[existingCVIndex];
  },

  deleteCV: ({ id }: { id: string }): string => {
    const existingCVIndex = mock_database.cvs.findIndex((cv) => cv.id === id);

    if (existingCVIndex === -1) {
      throw new Error("CV not found.");
    }

    mock_database.cvs.splice(existingCVIndex, 1);
    pubsub.publish(CV_DELETED, { cvDeleted: existingCVIndex});
    return id;
  },
};
