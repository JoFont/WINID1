import React, { useGlobal, Fragment } from "reactn";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const Register = props => {
  const { getFieldDecorator } = props.form;
  const [fire] = useGlobal("fire");

  const handleSubmit = async e => {
    e.preventDefault();
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        try {
          await fire.auth().createUserWithEmailAndPassword(values.email, values.password);
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
        <Form.Item className="mb-0">
          {/* {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full hover:bg-transparent winid-gradient-107 text-white hover:text-winid-1 font-semibold hover:text-winid-1 py-1 px-4 border hover:border-winid-1 border-transparent rounded"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <span className="block my-2 text-indigo-400 leading-none text-center">or</span>
      <Link
        to="/login"
        className="w-full block text-center bg-transparent hover:bg-winid-1 text-winid-1 font-semibold hover:text-white py-1 px-4 border border-winid-1 hover:border-transparent rounded"
      >
        Login
      </Link>
    </Fragment>
  );
};

const WrappedRegisterForm = Form.create({ name: "normal_login" })(Register);

export default WrappedRegisterForm;
