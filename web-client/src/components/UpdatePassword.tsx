import React, { useState } from "react";
import { graphqlRequest } from "../helpers/requests";
import { updatePassword } from "../graphql/Users/mutations";

export const UpdatePassword = ({
  username,
  toggleForm,
}: {
  username: string;
  toggleForm: () => void;
}) => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { oldPassword, newPassword } = formValues;
    graphqlRequest({
      query: updatePassword,
      variables: { username, oldPassword, newPassword },
    }).then(({ errors }) => {
      if (!errors) {
        toggleForm();
      } else {
        setError(errors[0].message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="oldPassword"
          value={formValues.oldPassword}
          placeholder="old password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="newPassword"
          value={formValues.newPassword}
          placeholder="new password"
          onChange={handleChange}
        />
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
