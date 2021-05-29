import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const GeneralResponse = new GraphQLObjectType({
  name: "GeneralResponse",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});
