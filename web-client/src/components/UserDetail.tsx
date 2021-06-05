import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link, useHistory } from "react-router-dom";
import { userType } from "./UsersList";
import { UpdatePassword } from "./UpdatePassword";
import { graphqlRequest } from "../helpers/requests";
import { getUserById } from "../graphql/Users/queries";
import { deleteUser } from "../graphql/Users/mutations";

interface MatchParams {
  userid: string;
}

export const UserDetail = (props: RouteComponentProps<MatchParams>) => {
  const [user, setUser] = useState<userType>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    getUser(props.match.params.userid);
  }, []);

  const getUser = (id: string) => {
    graphqlRequest({ query: getUserById, variables: { id } }).then(({ data }) =>
      setUser(data.getUserById)
    );
  };

  const onDelete = async (id: number) => {
    await graphqlRequest({ query: deleteUser, variables: { id } });
    history.push("/");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/">Home</Link>
      {user.username} - {user.email}
      <button onClick={toggleForm}>Update Password</button>
      <button onClick={() => onDelete(user.id)}>Delete user</button>
      {showForm && (
        <UpdatePassword username={user.username} toggleForm={toggleForm} />
      )}
    </div>
  );
};
