import { GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../Typedefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(root: any, args: any) {
    const { username, email, password } = args;
    await Users.insert({ username, email, password });
    return args;
  },
};
