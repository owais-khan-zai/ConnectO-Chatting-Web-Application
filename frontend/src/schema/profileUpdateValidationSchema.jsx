import React from "react";
import * as Yup from "yup";

export default Yup.object({
  firstName: Yup.string()
    .min(3, "Minimum 3 letters")
    .max(8, "Maximum 8 letters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(3, "Minimum 3 letters")
    .max(8, "Maximum 8 letters")
    .required("Last name is required"),

  about: Yup.string()
    .min(15, "Minimum 15 letters")
    .max(40, "Maximum 40 letters")
    .required("About section is required"),

  age: Yup.number()
    .min(8, "Age must be at least 8")
    .required("Age is required"),
});
