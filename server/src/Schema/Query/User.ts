import { GraphQLID, GraphQLList } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../Typedefs/User";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve() {
    const users = await Users.find();
    return users;
  },
};

export const GET_USER_BY_ID = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(root: any, args: any) {
    const user = await Users.findOne({
      where: { id: args.id },
    });

    return user;
  },
};
