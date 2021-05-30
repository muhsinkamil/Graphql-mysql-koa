import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { userType } from "./UsersList";
import { graphqlRequest } from "../helpers/requests";
import { getUserById } from "../graphql/Users/queries";

interface MatchParams {
  userid: string;
}

export const UserDetail = (props: RouteComponentProps<MatchParams>) => {
  const [user, setUser] = useState<userType>();

  const getUser = (id: string) => {
    graphqlRequest({ query: getUserById, variables: { id } }).then(({ data }) =>
      setUser(data.getUserById)
    );
  };

  useEffect(() => {
    getUser(props.match.params.userid);
  }, []);

  return (
    <div>
      {user && user.username}- {user?.email}
    </div>
  );
};
