import React from "react";

// Components
import Reset from "../components/Reset";

const Sell = props => (
  <div>
    <p>Reset Password</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default Sell;