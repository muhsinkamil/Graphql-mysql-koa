import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { userType } from "./UsersList";
import { UpdatePassword } from "./UpdatePassword";
import { graphqlRequest } from "../helpers/requests";
import { getUserById } from "../graphql/Users/queries";

interface MatchParams {
  userid: string;
}

export const UserDetail = (props: RouteComponentProps<MatchParams>) => {
  const [user, setUser] = useState<userType>();
  const [showForm, setShowForm] = useState<boolean>(false);

  const getUser = (id: string) => {
    graphqlRequest({ query: getUserById, variables: { id } }).then(({ data }) =>
      setUser(data.getUserById)
    );
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    getUser(props.match.params.userid);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/">Home</Link>
      {user.username} - {user.email}
      <button onClick={toggleForm}>Update Password</button>
      {showForm && (
        <UpdatePassword username={user.username} toggleForm={toggleForm} />
      )}
    </div>
  );
};
