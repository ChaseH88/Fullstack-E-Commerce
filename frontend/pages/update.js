import React from "react";

// Components
import UpdateItem from "../components/UpdateItem";

const Sell = ({ query }) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
);

export default Sell;