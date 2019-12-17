import React, { useState } from "reactn";
import Geocode from "react-geocode";

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
const AutoCompleteOption = AutoComplete.Option;

const CreateGameForm = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const handleLocationChange = async input => {
    if (!input) {
      setAutoCompleteResult([]);
    } else {
      const response = await Geocode.fromAddress(input);
      console.log(response.results);
      const { onChange, value } = props;
      if (onChange) {
        onChange({
          ...value,
          ...response
        });
      }
      console.log(props);
      setAutoCompleteResult(response.results);
    }
  };

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

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 }
  };

  const locationOptions = autoCompleteResult.map(location => (
    <AutoCompleteOption key={[location.geometry.location.lat, location.geometry.location.lng]}>
      {location.formatted_address}
    </AutoCompleteOption>
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
        <Form.Item label="Location">
          {getFieldDecorator("location", {
            rules: [{ required: true, message: "Please input location!" }]
          })(
            <AutoComplete dataSource={locationOptions} onChange={handleLocationChange} placeholder="location">
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
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
