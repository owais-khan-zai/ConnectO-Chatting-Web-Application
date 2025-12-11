import React from 'react'
import * as Yup from "yup";

export const schema = Yup.object({
    firstName:Yup.string().min(3, "First name must have 3 characters at least").max(8, "First name have 8 characters maximum").required("Name is required"),
    lastName:Yup.string().min(3, "Last name must have 3 characters at least").max(8, "Last name have 8 characters maximum").required("Name is required"),
    email:Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
})
