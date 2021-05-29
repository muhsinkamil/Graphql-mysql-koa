import React, { useState, useEffect } from "react";
import { graphqlRequest } from "../helpers/requests";
import { getAllUsers } from "../graphql/Users/queries";

interface user {
  username: string;
  id: number;
}

export const UsersList = () => {
  const [users, setUsers] = useState<Array<user>>([]);

  useEffect(() => {
    const fetchUsers = () => {
      graphqlRequest({ query: getAllUsers }).then(({ data }) => {
        setUsers(data.getAllUsers);
      });
    };

    fetchUsers();
  }, []);

  const renderList = (users: user[]) => {
    return users.map((user) => <div key={user.id}>{user.username}</div>);
  };

  return <div>{renderList(users)}</div>;
};
