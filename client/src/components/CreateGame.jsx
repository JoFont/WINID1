import React, { useState } from "reactn";
import { Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Checkbox, Row, Col } from "antd";
const { Option } = Select;

const CreateGame = props => {
  const [number, setNumber] = useState(2);

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

  return (
    <div>
      <h1>CREATE GAME</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item {...formItemLayout}>
          <InputNumber
            min={2}
            value={number}
            name="starters"
            onChange={value => {
              setNumber(value);
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <InputNumber
            min={0}
            value={number}
            name="subs"
            onChange={value => {
              setNumber(value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateGame;
