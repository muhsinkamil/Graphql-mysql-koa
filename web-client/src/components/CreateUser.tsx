import React, { useState } from "react";
import { createUser } from "../graphql/Users/mutations";
import { graphqlRequest } from "../helpers/requests";
import { userType } from "./UsersList";
import { useHistory } from "react-router-dom";

export const CreateUser = () => {
  let history = useHistory();

  const [user, setUser] = useState<Omit<userType, "id">>({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await graphqlRequest({ query: createUser, variables: user });
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        name="username"
        value={user?.username}
        onChange={handleChange}
      />
      <input
        placeholder="email"
        name="email"
        value={user?.email}
        onChange={handleChange}
      />
      <input
        placeholder="password"
        name="password"
        value={user?.password}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
};
