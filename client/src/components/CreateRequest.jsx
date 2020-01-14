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
    <div className="flex justify-end items-center bg-gray-100 py-2 rounded border px-2">
      <InputNumber
        min={1}
        max={maxRequestNumber}
        className="w-12"
        value={requestNumber}
        onChange={val => handleInputsChange(val)}
      />
      <span className="mx-2 flex-1">players needed</span>
      <Button
        className="bg-winid-1 px-4 rounded shadow border-none text-white hover:bg-indigo-600"
        onClick={handleSubmitRequest}
      >
        Go!
      </Button>
      <Button
        className="bg-transparent px-2 ml-1 rounded border text-gray-500"
        onClick={e => {
          props.handleForms("fadeIn", "fadeOut hidden");
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CreateRequestForm;
