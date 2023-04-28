import React, { useState } from "react";
import { Input } from "antd";
import {
  UserOutlined,
  UnlockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import "./Input.scss";

const FormInput = ({ field, ...props }) => {
  const { name, onChange, onBlur, value } = field;
  const { autoFocus, placeholder, type, label, maxLength, adorment, validation } = props;

  const [pswd, setPswd] = useState(type);

  const Icon = {
    user: <UserOutlined className="site-form-item-icon" />,
    pswd:
      pswd === "password" ? (
        <EyeTwoTone onClick={() => pswdToggle()} />
      ) : (
        <EyeInvisibleOutlined onClick={() => pswdToggle()} />
      ),
    unlock: <UnlockOutlined className="site-form-item-icon" />,
  };

  const pswdToggle = () => {
    if (pswd === "password") {
      setPswd("text");
    } else {
      setPswd("password");
    }
  };

  const adormentIcon = (value) => Icon[value] || "";

  return (
    <div className="FormInput">
      <Input
        name={name}
        value={value}
        id={name}
        type={type === "password" ? pswd : type}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        prefix={adormentIcon(adorment)}
        suffix={type === "password" && adormentIcon("pswd")}
      />

        <div className="error-field">{validation?.errors[name] && validation?.touched[name] && validation?.errors[name]}</div>
    </div>
  );
};

export default FormInput;
