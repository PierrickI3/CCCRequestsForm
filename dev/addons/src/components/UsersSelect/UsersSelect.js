import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import { searchUser } from "../../services/gc";
import UsersSelectItem from "./UsersSelectItem";

var searchedPattern = "";

export default function UsersSelect(props) {
  const [focused, setFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchPattern, setSearchPattern] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(props.initialValue)) {
      setSelectedItems(props.initialValue);
    } else {
      setSelectedItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValue]);

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
    <div style={{ padding: "4px", border: "1px solid #cccccc", borderRadius: "4px" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.isArray(selectedItems) &&
          selectedItems.map((x, i) => {
            return (
              <UsersSelectItem
                key={i}
                name={x}
                onRemoveClick={() => {
                  let si = selectedItems.filter((y) => y !== x);
                  setSelectedItems(si);
                  props.onChange(si);
                }}
              />
            );
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
          }, 200);
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
          type="select"
          style={{ height: "90px", position: "absolute" }}
          multiple
          onChange={(x) => {
            const clickedText = x.target.options[x.target.selectedIndex].text;
            if (clickedText && (clickedText.startsWith("Searching...") || clickedText.startsWith("Type a name..."))) {
              return;
            }
            if (Array.isArray(selectedItems) && !selectedItems.includes(clickedText)) {
              let si = [...selectedItems];
              si.push(clickedText);
              setSelectedItems(si);
              props.onChange(si);
            }
          }}
        >
          {searching && <option>Searching...</option>}
          {!searching && (!searchPattern || searchPattern.length < 3) && <option>Type a name...</option>}
          {!searching &&
            Array.isArray(searchResult) &&
            searchResult.map((x, i) => {
              return <option key={i}>{x}</option>;
            })}
        </Input>
      )}
    </div>
  );
}
