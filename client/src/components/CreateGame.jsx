import React from "reactn";
import { Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Checkbox, Row, Col } from "antd";
const { Option } = Select;

const CreateGame = () => {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <div>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}></Form>
    </div>
  );
};
