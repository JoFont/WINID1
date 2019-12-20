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
  const [sportStarters, setSportStarters] = useState(1);
  const [sportSubs, setSportSubs] = useState(0);

  const buildSports = async () => {
    const response = await getAllSports();
    setSports(response.data);
  };

  useEffect(() => {
    buildSports();
  }, []);

  const handleSportChange = async val => {
    const valSplited = val.split(",");
    setSportIcon(`${valSplited[1].toLowerCase()}`);
    setGameForm({
      ...gameForm,
      ...valSplited[0]
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
      <div className="flex items-center justify-center bg-gray-100 py-4 rounded pb-6 border mb-2">
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
              <Option key={sport._id} value={`${sport._id},${sport.name}`}>
                {sport.name}
              </Option>
            );
          })}
      </Select>
      <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleLocationChange}
        notFoundContent={"Search for address..."}
        className="w-full mb-2"
        placeholder="Insert location..."
        onChange={val => handleInputsChange({ location: val })}
      >
        {locationOptions}
      </Select>
      <div className="flex">
        <DatePicker
          format="DD-MM-YYYY"
          className="w-1/2 mb-2 mr-2"
          onChange={val => handleInputsChange({ date: val })}
          disabledDate={disabledDate}
        />
        <TimePicker format="HH:mm" className="w-1/2 mb-2" onChange={val => handleInputsChange({ time: val })} />
      </div>

      <div className="flex items-center justify-between mb-2 px-2 pb-2 pt-1 bg-gray-100 border rounded">
        <div className="w-1/3">
          <span className="text-xs text-indigo-700 text-center block">Starters</span>
          <InputNumber
            defaultValue={sportStarters}
            min={2}
            className="w-full"
            onChange={val => handleInputsChange({ starters_number: val })}
          />
        </div>
        <div className="w-1/3 mx-2">
          <span className="text-xs text-indigo-700 text-center block">Subs</span>
          <InputNumber
            defaultValue={sportSubs}
            min={0}
            className="w-full"
            name="subs"
            onChange={val => handleInputsChange({ subs_number: val })}
          />
        </div>
        <div className="w-1/3">
          <span className="text-xs text-indigo-700 text-center block">Price</span>
          <InputNumber
            min={0}
            defaultValue={0}
            className="w-full"
            formatter={value => `${value}€`}
            parser={value => value.replace("€", "")}
            onChange={val => handleInputsChange({ price: val })}
          />
        </div>
      </div>
      <Button
        type="primary"
        className="w-full hover:bg-transparent bg-winid-1 text-white hover:text-winid-1 font-semibold hover:text-winid-1 py-1 px-4 border hover:border-winid-1 border-transparent rounded"
        onClick={handleSubmit}
      >
        Game on!
      </Button>
    </div>
  );
};

export default CreateGameForm;
