import { GraphQLList } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../Typedefs/User";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve() {
    const users = await Users.find();
    return users;
  },
};
