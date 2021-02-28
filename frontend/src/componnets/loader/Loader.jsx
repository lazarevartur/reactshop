import React from "react";
import { Spinner } from "react-bootstrap";
import Orders from "../orders/Orders";
const Loader = ({ as }) => {
  return (
    <Spinner
      as={as}
      role="status"
      animation="border"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

Loader.defaultProps = {
  as: "div",
};

export default Loader;
