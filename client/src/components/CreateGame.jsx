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
  const [player] = useGlobal("player");

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

  const handleSubmit = async e => {
    e.preventDefault();
    props.form.validateFields(async (err, fieldsValue) => {
      const values = {
        ...fieldsValue,
        datePicker: fieldsValue["date-picker"].format("YYYY-MM-DD"),
        timePicker: fieldsValue["time-picker"].format("HH:mm")
      };
      if (!err) {
        console.log("Received values of form: ", values);
        console.log(props);
        const createdGame = await createOneGame(userToken, player, values);
        props.listUpdate();
      }
    });
  };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  const formItemLayout = {
    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 8 }
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 16 }
    // }
  };

  const locationOptions = autoCompleteResult.map(location => (
    <Option key={JSON.stringify(location)} className="w-full">
      {location.formatted_address}
    </Option>
  ));

  return (
    <Form onSubmit={handleSubmit} className="" layout="vertical">
      <div className="flex items-center justify-between border rounded-lg mb-2 p-2">
        <Form.Item label="Starters" className="flex-1 flex flex-col items-center mb-0 pb-0">
          {getFieldDecorator("starters", {
            rules: [{ required: true, message: "Starters is required!" }],
            initialValue: 5
          })(<InputNumber min={2} className="w-10" />)}
        </Form.Item>
        <Form.Item label="Subs" className="flex-1 flex flex-col items-center mb-0 pb-0">
          {getFieldDecorator("subs", {
            rules: [{ required: true, message: "Subs is required!" }],
            initialValue: 0
          })(<InputNumber min={0} className="w-10" />)}
        </Form.Item>
        <Form.Item label="Price" className="flex-1 flex flex-col items-center mb-0 pb-0">
          {getFieldDecorator("price", {
            rules: [{ required: true, message: "Subs is required!" }],
            initialValue: 0
          })(<InputNumber min={0} className="w-10" />)}
        </Form.Item>
      </div>

      <Form.Item className="mb-0">
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
            className="w-full"
            placeholder="Insert location..."
          >
            {locationOptions}
          </Select>
        )}
      </Form.Item>

      <Form.Item className="mb-0">{getFieldDecorator("date-picker")(<DatePicker className="w-full" />)}</Form.Item>
      <Form.Item className="mb-0">
        {getFieldDecorator("time-picker")(<TimePicker format={"HH:mm"} className="w-full" />)}
      </Form.Item>
      <Form.Item className="m-0 w-full pb-0">
        <Button
          htmlType="submit"
          type="primary"
          className="font-winid1 uppercase w-full"
          disabled={hasErrors(getFieldsError())}
          size="large"
        >
          Create!
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedCreateGameForm = Form.create({
  name: "CreateGameForm"
})(CreateGameForm);
export default WrappedCreateGameForm;
