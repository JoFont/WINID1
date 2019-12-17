import React, { useState, useGlobal } from "reactn";
import Geocode from "react-geocode";
import { createOne as createOneGame } from "../services/api/game";

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
  Col,
  AutoComplete
} from "antd";

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API);

const { Option } = Select;

const CreateGameForm = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [userToken] = useGlobal("userToken");

  const handleLocationChange = async input => {
    if (!input) {
      setAutoCompleteResult([]);
    } else {
      try {
        const response = await Geocode.fromAddress(input);
        setAutoCompleteResult(response.results);
      } catch (error) {}
    }
  };

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, fieldsValue) => {
      const values = {
        ...fieldsValue,
        "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
        "time-picker": fieldsValue["time-picker"].format("HH:mm")
      };
      if (!err) {
        console.log("Received values of form: ", values);
        console.log(JSON.parse(values.location));
        createOneGame(userToken, values);
      }
    });
  };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  const formItemLayout = {};

  const locationOptions = autoCompleteResult.map(location => (
    <Option key={JSON.stringify(location)}>{location.formatted_address}</Option>
  ));

  return (
    <div>
      <h1>CREATE GAME</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator("starters", {
            rules: [{ required: true, message: "Starters is required!" }],
            initialValue: 5
          })(<InputNumber min={2} />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator("subs", {
            rules: [{ required: true, message: "Subs is required!" }],
            initialValue: 0
          })(<InputNumber min={0} />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          {getFieldDecorator("price", {
            rules: [{ required: true, message: "Subs is required!" }],
            initialValue: 0
          })(<InputNumber min={0} />)}
        </Form.Item>
        <Form.Item label="Location">
          {getFieldDecorator("location", {
            rules: [{ required: true, message: "Please input location!" }]
          })(
            <Select
              showSearch
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleLocationChange}
              notFoundContent={"Search for address..."}
            >
              {locationOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="DatePicker">{getFieldDecorator("date-picker")(<DatePicker />)}</Form.Item>
        <Form.Item label="TimePicker">{getFieldDecorator("time-picker")(<TimePicker format={"HH:mm"} />)}</Form.Item>
        <Form.Item {...formItemLayout}>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Create!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCreateGameForm = Form.create({
  name: "CreateGameForm"
})(CreateGameForm);
export default WrappedCreateGameForm;
