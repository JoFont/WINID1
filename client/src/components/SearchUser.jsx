import React, { useState, useGlobal } from "reactn";
import { searchByUsername, searchByDisplayName } from "../services/api/player";
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
        if(query.charAt(0) === "@" && query.length > 1) {
          const sanitizedQuery = query.substring(1);
          const response = await searchByUsername(userToken, sanitizedQuery);
          setAutoCompleteResult(response.data);
        } else {
          const response = await searchByDisplayName(userToken, query);
          setAutoCompleteResult(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const playerOptions = autoCompleteResult.map(player => (
    <Option key={player._id} className="w-full" value={JSON.stringify(player)}>
      <span className="font-semibold">{player.displayName}</span>
      <span className="text-gray-500 ml-2 text-xs">@{player.username}</span>
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
        onChange={val => props.handlePlayerSelect(val)}
      >
        {playerOptions}
      </Select>
    </div>
  );
};

export default SearchUser;
