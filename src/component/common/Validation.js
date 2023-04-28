import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    userName: Yup.string()
      // Format Validation
      .email("Invalid email address format")
      // Required Field Validation
      .required("Email is required"),
    userPswd: Yup.string()
      //Minimum Character Validation
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });