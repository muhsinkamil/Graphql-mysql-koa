import React, { useState } from "react";
import { createUser } from "../graphql/Users/mutations";
import { graphqlRequest } from "../helpers/requests";
import { userType } from "./UsersList";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

export const CreateUser = () => {
  let history = useHistory();

  const user = {
    username: "",
    password: "",
    email: "",
  };

  const { formValues, handleChange } = useForm<Omit<userType, "id">>(user);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await graphqlRequest({ query: createUser, variables: formValues });
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        name="username"
        value={formValues.username}
        onChange={handleChange}
      />
      <input
        placeholder="email"
        name="email"
        value={formValues?.email}
        onChange={handleChange}
      />
      <input
        placeholder="password"
        name="password"
        value={formValues?.password}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
};
