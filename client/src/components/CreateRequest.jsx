import React, { useState, useGlobal } from "reactn";
import Geocode from "react-geocode";
import { createOne as createOneGame } from "../services/api/game";

import { Select, Input, InputNumber, Button, Row, Col } from "antd";

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API);

const { Option } = Select;
const InputGroup = Input.Group;

const CreateRequestForm = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [userToken] = useGlobal("userToken");
  const [player] = useGlobal("player");
  const [gameForm, setGameForm] = useState({});

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

  const handleInputsChange = async value => {
    setGameForm({
      ...gameForm,
      ...value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const values = {
      ...gameForm,
      date: gameForm.date.format("YYYY-MM-DD"),
      time: gameForm.time.format("HH:mm")
    };
    await createOneGame(userToken, player, values);
    props.listUpdate();
  };

  const locationOptions = autoCompleteResult.map(location => (
    <Option key={location.place_id} className="w-full" value={JSON.stringify(location)}>
      {location.formatted_address}
    </Option>
  ));

  return (
    <div>
      <InputGroup size="large">
        <Row gutter={8}>
          <Col span={6}>
            <InputNumber
              min={0}
              defaultValue={1}
              className="w-full"
              size="large"
              onChange={val => handleInputsChange({ starters_number: val })}
            />
          </Col>
          <Col span={18}>
            <Button type="primary" className="font-winid1 uppercase w-full" size="large" onClick={handleSubmit}>
              Ask for players!
            </Button>
          </Col>
        </Row>
      </InputGroup>
    </div>
  );
};

export default CreateRequestForm;
