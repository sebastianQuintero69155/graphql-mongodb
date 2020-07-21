import { tasks } from "./sample";
import User from "./models/user.js";

export const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World'
    },
    greet: (_root, {name}, context) =>{
      return `Hello ${name}`
    },
    tasks: () => {
      return tasks
    },
    async users() {
      return await User.find();
    }
  },
  Mutation: {
    createTask: (_root, { input }) => {
      input._id = tasks.length
      tasks.push(input)
      return input
    },
    async createUser(_root, { input }) {
      const newUser = new User(input)
      await newUser.save();
      return newUser
    },
    async deleteUser(_root, { _id }) {
      return await User.findByIdAndDelete(_id);
    },
    async updateUser(_root,{ _id, input }) {
      return await User.findByIdAndUpdate(_id, input, { new: true })
    }
  }
};
