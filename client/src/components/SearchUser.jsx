import React, { useState, useGlobal } from "reactn";
import { searchByUsername } from "../services/api/player";
import { Select } from "antd";

const { Option } = Select;

const SearchUser = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [userToken] = useGlobal("userToken");

  const handleSearchChange = async query => {
    if (!query) {
      setAutoCompleteResult([]);
    } else {
      try {
        const response = await searchByUsername(userToken, query);
        setAutoCompleteResult(response.data);
      } catch (error) {}
    }
  };

  props.handlePlayerSelect = player => {
    return player;
  };

  const playerOptions = autoCompleteResult.map(player => (
    <Option key={player._id} className="w-full" value={JSON.stringify(player)}>
      {player.displayName} | {player.username}
    </Option>
  ));

  return (
    <div>
      <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearchChange}
        notFoundContent={"Search for address..."}
        className="w-full"
        placeholder="Insert location..."
        onChange={val => props.handlePlayerSelect({ location: val })}
      >
        {playerOptions}
      </Select>
    </div>
  );
};

export default SearchUser;
