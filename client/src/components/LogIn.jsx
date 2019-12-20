import React, { useGlobal, useEffect, Fragment } from "reactn";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { createBrowserHistory } from "history";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
const history = createBrowserHistory();

const LogIn = props => {
  const { getFieldDecorator } = props.form;
  const [fire] = useGlobal("fire");
  const [player] = useGlobal("player");

  const handleSubmit = async e => {
    e.preventDefault();
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await fire.auth().signInWithEmailAndPassword(values.email, values.password);
          console.log(history.location);
          history.push("/", { some: "state" });
        } catch (error) {
          throw error;
        }
      }
    });
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item className="mb-2">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Email" />)}
        </Form.Item>
        <Form.Item className="mb-2">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="w-full mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full hover:bg-transparent bg-winid-1 text-white hover:text-winid-1 font-semibold hover:text-winid-1 py-1 px-4 border hover:border-winid-1 border-transparent rounded"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <span className="block my-2 text-indigo-400 leading-none text-center">or</span>
      <Link
        to="/register"
        className="w-full block text-center bg-transparent hover:bg-winid-1 text-winid-1 font-semibold hover:text-white py-1 px-4 border border-winid-1 hover:border-transparent rounded"
      >
        Register
      </Link>
    </Fragment>
  );
};

const WrappedLoginForm = Form.create({ name: "normal_login" })(LogIn);

export default WrappedLoginForm;
