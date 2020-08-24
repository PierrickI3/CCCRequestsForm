import "./UserSelect.css";
import React, { useState } from "react";
import { Input } from "reactstrap";

import { searchUser } from "../../services/gc";

var searchedPattern = "";

export default function UsersSelect(props) {
  const [focused, setFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchPattern, setSearchPattern] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const searchForUser = async (pattern) => {
    console.log(`searchForUser([${pattern}])`);
    searchedPattern = pattern;
    setSearchPattern(pattern);
    if (searching) return;
    if (!pattern || pattern.length < 3) {
      setSearchResult([]);
      return;
    }
    setSearching(true);
    const userList = await searchUser("mypurecloud.com", props.token, pattern);
    if (Array.isArray(userList)) {
      setSearchResult(userList.map((x) => x.name));
    } else {
      setSearchResult([]);
    }
    setSearching(false);
    if (searchedPattern !== pattern) {
      searchForUser(searchedPattern);
    }
  };

  return (
    <div>
      <div>
        {Array.isArray(selectedItems) &&
          selectedItems.map((x) => {
            return <div>ffff{x}</div>;
          })}
      </div>
      <Input
        onFocus={() => {
          setFocused(true);
          setSearchResult([]);
        }}
        onBlur={() => {
          // timeout to allow handle a click event on the selected item
          setTimeout(() => {
            setSearchPattern("");
            setFocused(false);
          }, 100);
        }}
        style={searching ? { backgroundColor: "#eeeeee" } : {}}
        placeholder="Search for user..."
        value={searchPattern || ""}
        onChange={(e) => {
          searchForUser(e.target.value);
        }}
      />
      {focused && (
        <Input
          className="user-select-dropdown"
          type="select"
          multiple
          onClick={(x) => {
            console.log(x);
          }}
        >
          {searching && <option>Searching...</option>}
          {!searching && (!searchPattern || searchPattern.length < 3) && <option>Type a name...</option>}
          {!searching &&
            Array.isArray(searchResult) &&
            searchResult.map((x, i) => {
              return (
                <option
                  key={i}
                  onChange={() => {
                    console(x);
                    if (Array.isArray(selectedItems) && !selectedItems.includes(x)) {
                      let si = { ...selectedItems };
                      si.push(x);
                      setSelectedItems(si);
                    }
                  }}
                >
                  {x}
                </option>
              );
            })}
        </Input>
      )}
    </div>
  );
}
