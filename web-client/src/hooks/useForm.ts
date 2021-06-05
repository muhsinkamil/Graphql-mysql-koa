import React, { useState } from "react";

export const useForm = <T>(values: T) => {
  const [formValues, setFormValues] = useState<T>(values);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return { formValues, handleChange };
};
