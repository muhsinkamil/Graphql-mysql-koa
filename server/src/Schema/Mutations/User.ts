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

export const UPDATE_PASSWORD = {
  type: UserType,
  args: {
    username: { type: GraphQLString! },
    oldPassword: { type: GraphQLString! },
    newPassword: { type: GraphQLString! },
  },
  async resolve(root: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await Users.findOne({ username });
    const currentPassword = user?.password;

    if (currentPassword === oldPassword) {
      await Users.update({ username }, { password: newPassword });
      return user;
    } else {
      throw new Error("Password is incorrect");
    }
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
