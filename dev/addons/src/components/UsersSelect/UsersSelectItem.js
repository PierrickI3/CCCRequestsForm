import React from "react";
import { Button } from "reactstrap";
import { IoMdClose } from "react-icons/io";

export default function UsersSelectItem(props) {
  return (
    <div style={{ display: "flex", backgroundColor: "#dddddd", borderRadius: "2px", marginBottom: "4px", marginRight: "4px" }}>
      <div style={{ fontSize: "0.8em", paddingLeft: "8px", lineHeight: "20px" }}>{props.name}</div>
      <div>
        <Button
          style={{ height: "20px", lineHeight: "10px", color: "black" }}
          color="link"
          size="sm"
          outline
          onClick={() => {
            props.onRemoveClick();
          }}
        >
          <IoMdClose />
        </Button>
      </div>
    </div>
  );
}
