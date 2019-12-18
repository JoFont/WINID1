import React, { useState, useGlobal, useEffect } from "reactn";
import Geocode from "react-geocode";
import { createOne as createOneGame } from "../services/api/game";

import { Select, Input, InputNumber, Button, Row, Col } from "antd";

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API);

const { Option } = Select;
const InputGroup = Input.Group;

const CreateRequestForm = props => {
  const [userToken] = useGlobal("userToken");
  const [player] = useGlobal("player");
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    const game = props.game;
    if (game) {
      setRequestNumber(game.starters.number * 2 - ((game.starters.players && game.starters.players.length) || 0));
    }
  }, [props.game]);

  const handleInputsChange = async value => {
    setRequestNumber(value);
    console.log(requestNumber);
  };

  const handleSubmit = async e => {
    // e.preventDefault();
    // const values = {
    //   ...gameForm,
    //   date: gameForm.date.format("YYYY-MM-DD"),
    //   time: gameForm.time.format("HH:mm")
    // };
    // await createOneGame(userToken, player, values);
    // props.listUpdate();
  };

  return (
    <div>
      <InputGroup size="large">
        <Row gutter={8}>
          <Col span={6}>
            <InputNumber
              min={1}
              className="w-full"
              size="large"
              value={requestNumber}
              onChange={val => handleInputsChange(val)}
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
