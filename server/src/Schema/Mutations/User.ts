import { GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { GeneralResponse, UserType } from "../Typedefs/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    username: { type: GraphQLString! },
    email: { type: GraphQLString! },
    password: { type: GraphQLString! },
  },
  async resolve(root: any, args: any) {
    const { username, email, password } = args;
    await Users.insert({ username, email, password });
    return args;
  },
};

export const DELETE_USER = {
  type: GeneralResponse,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(root: any, args: any) {
    try {
      await Users.delete(args.id);
      return { success: true, message: "user deleted" };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },
};
