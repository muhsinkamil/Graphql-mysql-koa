import React, { useState } from "react";
import { graphqlRequest } from "../helpers/requests";
import { updatePassword } from "../graphql/Users/mutations";
import { useForm } from "../hooks/useForm";

interface PasswordFormType {
  oldPassword: string;
  newPassword: string;
}

export const UpdatePassword = ({
  username,
  toggleForm,
}: {
  username: string;
  toggleForm: () => void;
}) => {
  const passwordValues: PasswordFormType = {
    oldPassword: "",
    newPassword: "",
  };

  const { formValues, handleChange } = useForm(passwordValues);

  const [error, setError] = useState("");

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
