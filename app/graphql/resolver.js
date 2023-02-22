export const resolvers = {
  //Qureries
  Query: {
    data: () => {
      return "hi";
    },
  },
  // Mutations,
  Mutation: {
    data: (parent, arg) => {
      console.log(arg);
      return "mutation hi";
    },
  },
};
