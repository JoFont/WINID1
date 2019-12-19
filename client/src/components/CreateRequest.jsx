import React, { useState, useGlobal, useEffect } from "reactn";
import Geocode from "react-geocode";
import { createOne as createOneRequest } from "../services/api/request";

import { Select, Input, InputNumber, Button, Row, Col } from "antd";

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API);

const { Option } = Select;
const InputGroup = Input.Group;

const CreateRequestForm = props => {
  const [userToken] = useGlobal("userToken");
  const [player] = useGlobal("player");
  const [fire] = useGlobal("fire");
  const [requestNumber, setRequestNumber] = useState(0);
  const [maxRequestNumber, setMaxRequestNumber] = useState(99);

  useEffect(() => {
    const game = props.game;
    if (game) {
      setRequestNumber(game.startersNum * 2 - ((game.starters && game.starters.length) || 0));
      setMaxRequestNumber((game.startersNum + game.subsNum) * 2 - ((game.starters && game.starters.length) || 0));
    }
  }, [props.game]);

  const handleInputsChange = async value => {
    setRequestNumber(value);
  };

  const handleSubmitRequest = async e => {
    e.preventDefault();
    const request = await createOneRequest(fire, userToken, {
      need: requestNumber,
      game: props.game._id,
      admins: props.game.admins
    });
  };

  return (
    <div>
      <InputGroup size="large">
        <Row gutter={8}>
          <Col span={6}>
            <InputNumber
              min={1}
              max={maxRequestNumber}
              className="w-full"
              size="large"
              value={requestNumber}
              onChange={val => handleInputsChange(val)}
            />
          </Col>
          <Col span={18}>
            <Button type="primary" className="font-winid1 uppercase w-full" size="large" onClick={handleSubmitRequest}>
              Ask for players!
            </Button>
          </Col>
        </Row>
      </InputGroup>
    </div>
  );
};

export default CreateRequestForm;
