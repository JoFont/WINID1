import React, { useState, useGlobal } from "reactn";
import { searchByUsername, searchByDisplayName } from "../services/api/player";
import { Select, Icon } from "antd";

const { Option } = Select;

const SearchUser = props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [userToken] = useGlobal("userToken");

  console.log("PROPS", props.compareArray);

  const handleSearchChange = async query => {
    if (!query) {
      setAutoCompleteResult([]);
    } else {
      try {
        if (query.charAt(0) === "@" && query.length > 1) {
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
    <Option
      key={player._id}
      className="w-full flex items-center justify-start"
      value={JSON.stringify(player)}
      disabled={props.compareArray.includes(player._id)}
    >
      <span className="font-semibold">{player.displayName}</span>
      <span className="text-gray-500 ml-2 text-xs">@{player.username}</span>
      {props.compareArray.includes(player._id) && (
        <Icon type="check-circle" className="text-green-500 text-lg ml-auto" />
      )}
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
        notFoundContent={"No player..."}
        className="w-full"
        placeholder="Insert player or username..."
        onChange={val => props.handlePlayerSelect(val)}
      >
        {playerOptions}
      </Select>
    </div>
  );
};

export default SearchUser;
