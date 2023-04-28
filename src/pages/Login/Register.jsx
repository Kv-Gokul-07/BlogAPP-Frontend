import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { CiLogin } from "react-icons/ci";
import { BsPersonAdd } from "react-icons/bs";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, notification } from "antd";
import { Field, Form, Formik } from "formik";
import FormInput from "../../component/common/Input/Input";
import CustomButton from "../../component/common/Button/CustomButton";
import { LoginSchema } from "../../component/common/Validation";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="custom_container register_container">
      <div className="form-content">
        <div className="form_header">
          <div className="signin_header header_content">
            <div>
              <div className="icon">
                <CiLogin className="icon_large" />
              </div>
              <Link to="/login">
                <h1>Sign in</h1>
              </Link>
            </div>
          </div>
          <div className="register_header header_content">
            <div>
              <div className="icon">
                <BsPersonAdd className="icon_large" />
              </div>
              <Link to="/register">
                <h1>Register</h1>
              </Link>
            </div>
          </div>
        </div>
        <div className="avatar">
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <Formik
          initialValues={{ userName: "", userPswd: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            const postData = {
              userName: values.userName,
              userPswd: values.userPswd,
            };

            await fetch("https://blog-backend-d16l.onrender.com/auth/register", {
              method: "POST",
              body: JSON.stringify(postData),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }).then((response) => {
              if (response.status === 500) {
                notification.error({
                  message: "Error",
                  description: "Account is Already Registerd",
                });
              } else if (response.status === 200) {
                notification.success({
                  message: "Success",
                  description: "Account is Registerd",
                });
                navigate("/");
              }
            });
          }}
        >
          {(values) => (
            <Form className="form_field">
              <Field
                type="email"
                name="userName"
                adorment="user"
                placeholder="User Email"
                validation={values}
                component={FormInput}
              />
              <Field
                type="password"
                name="userPswd"
                adorment="unlock"
                placeholder="Password"
                validation={values}
                component={FormInput}
              />

              <CustomButton
                type="submit"
                name="Register"
                btnClass={"btn_submit"}
              />
            </Form>
          )}
        </Formik>
        <CustomButton
          type="submit"
          name="Sign in"
          outline="btn_outline"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default Register;
