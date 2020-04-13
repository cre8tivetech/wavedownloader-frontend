import React, { useState, useEffect } from "react";
import "./message.styles.scss";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMessage } from "../../redux/user/user.selector";
// import "../navigation/navigation.styles.scss";
const Alert = ({message}) => {
  // const [hide, setHide] = useState();
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
          <p>{message}</p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const mapStateToProps = createStructuredSelector({
  message: selectMessage,
});
export default connect(mapStateToProps)(Alert);
