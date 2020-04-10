import React, { useState, useEffect } from "react";
import "./message.styles.scss";
// import Navigation from "../navigation/navigation.component";
import { withRouter } from "react-router-dom";
// import "../navigation/navigation.styles.scss";
const Message = props => {
  const message = props.history.location.state;
  // const [hide, setHide] = useState();
  console.log(props.history);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setHide("message-section");
  //   }, 10);
  //   setTimeout(() => {
  //     setHide("close");
  //   }, 20000);
  // }, [setHide]);

  const close = e => {
    return (e.currentTarget.parentElement.className = "close");
  };
  // <!-- HEADER -->
  if (message) {
    return (
      <div className="message-section">
        <span onClick={e => close(e)}>x</span>
        <div>
          <p>{message.error}</p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default withRouter(Message);
