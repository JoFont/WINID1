import React, { useGlobal } from 'reactn';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const Register = props => {
  const { getFieldDecorator } = props.form;
  const [fire] = useGlobal('fire');

  const handleSubmit = async e => {
    e.preventDefault();
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        try {
          const user = await fire
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password);
          const token = await fire.auth().currentUser.getIdToken();
          const res = await axios.post(
            'http://localhost:3030/api/player/create',
            {
              headers: {
                authorization: `Bearer ${token}`
              },
              data: {
                user
              }
            }
          );
        } catch (error) {
          throw error;
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h1>Register</h1>
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

const WrappedRegisterForm = Form.create({ name: 'normal_login' })(Register);

export default WrappedRegisterForm;
