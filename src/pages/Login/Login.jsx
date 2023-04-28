import React, { useContext } from "react";
import { CiLogin } from "react-icons/ci";
import { BsPersonAdd } from "react-icons/bs";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, notification } from "antd";

import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";
import { Field, Form, Formik } from "formik";
import FormInput from "../../component/common/Input/Input";
import CustomButton from "../../component/common/Button/CustomButton";
import { LoginSchema } from "../../component/common/Validation";
import { UserContext } from "../../ReactContext/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const  {setUserInfo} = useContext(UserContext);

  return (
    <div className="custom_container login_container">
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

            const response = await fetch("https://blog-backend-d16l.onrender.com/auth/login", {
              method: "POST",
              body: JSON.stringify(postData),
              headers: { "Content-Type": "application/json" },
              credentials: 'include'
            })

            if(response.ok) {
              response.json().then ((userInfo) => {
                setUserInfo(userInfo);
                notification.success({
                        message: "Success",
                        description: "Successfully Logged in",
                      });
                      navigate("/");
              })
            }
            
            // .then((response) => {

            //   if (response.status === 200) {
            //     notification.success({
            //       message: "Success",
            //       description: "Successfully Logged in",
            //     });
            //     navigate("/");
            //   }
            //   else if (response.status === 400) {
            //     notification.error({
            //       message: "Error",
            //       description: "User Does not Exists",
            //     });
            //   }
            // });
          }}
        >
          {(values) => (
            <Form className="form_field">
              <Field
                type="email"
                name="userName"
                adorment="user"
                placeholder="User Email"
                component={FormInput}
                validation={values}
              />
              <Field
                type="password"
                name="userPswd"
                adorment="unlock"
                placeholder="Password"
                component={FormInput}
                validation={values}
              />
              {/* <button >Submit</button> */}
              <CustomButton
                type="primary"
                disabled={!values?.isValid}
                name="Sign in"
                btnClass="btn_submit"
              />
            </Form>
          )}
        </Formik>
        <CustomButton
          name="Register"
          outline="btn_outline"
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
};

export default Login;
