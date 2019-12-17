import React, { useState } from "reactn";
import {
  Input,
  Form,
  Select,
  InputNumber,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col
} from "antd";
const { Option } = Select;

const CreateGameForm = props => {
  const [number, setNumber] = useState(2);

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 }
  };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  return (
    <div>
      <h1>CREATE GAME</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator("starters", {
            rules: [{ required: true, message: "Username is required!" }]
          })(<InputNumber min={2} />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator("subs", {
            rules: [{ required: true, message: "Username is required!" }]
          })(<InputNumber min={0} />)}
        </Form.Item>
        <Form.Item>{getFieldDecorator()}</Form.Item>
        <Form.Item {...formItemLayout}>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Create!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCreateGameForm = Form.create({ name: "horizontal_login" })(CreateGameForm);
export default WrappedCreateGameForm;
