import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { graphqlRequest } from "../helpers/requests";
import { getAllUsers } from "../graphql/Users/queries";

export interface userType {
  username: string;
  id: number;
  email?: string;
  password?: string;
}

export const UsersList = () => {
  const [users, setUsers] = useState<Array<userType>>([]);

  const fetchUsers = () => {
    graphqlRequest({ query: getAllUsers }).then(({ data }) => {
      setUsers(data.getAllUsers);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderList = (users: userType[]) => {
    if (!users.length) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/user/${user.id}`}>{user.username}</Link>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <Link to="/user/create">
        <button>Create User</button>
      </Link>
      {renderList(users)}
    </div>
  );
};
