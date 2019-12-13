import React, { useGlobal, useEffect } from 'reactn';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const LogIn = props => {
  const { getFieldDecorator } = props.form;
  const [fire] = useGlobal('fire');
  const [player] = useGlobal('player');

  const handleSubmit = async e => {
    e.preventDefault();
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        try {
          const user = await fire
            .auth()
            .signInWithEmailAndPassword(values.email, values.password);
          // TODO: Testar fazer queries sem auth para ver se bomba
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

          console.log(res.data);
        } catch (error) {
          throw error;
        }
      }
    });
  };

  // useEffect(() => {

  // })

  return (
    <Form onSubmit={handleSubmit} className="login-form">
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

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LogIn);

export default WrappedLoginForm;
