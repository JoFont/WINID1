import React, { useState, useGlobal, useEffect } from "reactn";
import moment from "moment";
import Geocode from "react-geocode";
import { createOne as createOneGame } from "../services/api/game";
import { getAll as getAllSports } from "../services/api/sport";
import { Select, InputNumber, DatePicker, TimePicker, Button } from "antd";
import { createGroupChat } from "../services/chat";
import { GEOCODE_API } from "../constants/access-tokens";

Geocode.setApiKey(GEOCODE_API);

const { Option } = Select;

const CreateGameForm = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [userToken] = useGlobal("userToken");
  const [player] = useGlobal("player");
  const [gameForm, setGameForm] = useState({});
  const [fire] = useGlobal("fire");
  const [sports, setSports] = useState([]);
  const [sportIcon, setSportIcon] = useState("football");

  const buildSports = async () => {
    const response = await getAllSports();
    setSports(response.data);
  };

  useEffect(() => {
    buildSports();
  }, []);

  const handleSportChange = async val => {
    setSportIcon(`${val.toLowerCase()}`);
    setGameForm({
      ...gameForm,
      ...val
    });
  };

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

  const disabledDate = current => {
    // Can not select days before today and today
    return current <= moment().startOf("day");
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
    await createOneGame(fire, userToken, player, values);
    props.listUpdate();
  };

  const locationOptions = autoCompleteResult.map(location => (
    <Option key={location.place_id} className="w-full" value={JSON.stringify(location)}>
      {location.formatted_address}
    </Option>
  ));

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 py-4 rounded pb-6">
        <div className="leading-none font-semibold rounded-full bg-transparent text-white relative">
          <img src={`/icons/sport-icons/${sportIcon}.svg`} className="w-24" />
          <div
            className="leading-none font-semibold -mt-6 -ml-6 rounded-full bg-white p-2 shadow text-white bg-winid-1 absolute"
            style={{ right: -0.25 + "em", bottom: -0.25 + "em" }}
          >
            {/* <span className="text-2xl">{game.price.value / 100}</span> */}
            <small className="text-gray-300 text-xs">€</small>
            {/* TODO: {request.game.price.currency} => CONVERT CURRENCY IN THE FUTURE*/}
          </div>
        </div>
      </div>
      <Select defaultValue="Select Sport" onChange={val => handleSportChange(val)} className="z-10 w-full mb-2">
        {sports &&
          sports.map(sport => {
            return (
              <Option key={sport._id} value={sport.name}>
                {sport.name}
              </Option>
            );
          })}
      </Select>
      <div className="flex items-center justify-between border rounded-lg mb-2 p-2">
        <div>
          <span className="text-xs text-gray-600">Starters</span>
          <InputNumber min={2} className="w-full" onChange={val => handleInputsChange({ starters_number: val })} />
        </div>
        <InputNumber
          min={0}
          className="w-full"
          name="subs"
          onChange={val => handleInputsChange({ subs_number: val })}
        />
        <InputNumber min={0} className="w-full" onChange={val => handleInputsChange({ price: val })} />
      </div>
      <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleLocationChange}
        notFoundContent={"Search for address..."}
        className="w-full"
        placeholder="Insert location..."
        onChange={val => handleInputsChange({ location: val })}
      >
        {locationOptions}
      </Select>
      <DatePicker
        format="DD-MM-YYYY"
        className="w-full"
        onChange={val => handleInputsChange({ date: val })}
        disabledDate={disabledDate}
      />
      <TimePicker format="HH:mm" className="w-full" onChange={val => handleInputsChange({ time: val })} />
      <Button type="primary" className="font-winid1 uppercase w-full" size="large" onClick={handleSubmit}>
        Create!
      </Button>
    </div>
  );
};

export default CreateGameForm;
