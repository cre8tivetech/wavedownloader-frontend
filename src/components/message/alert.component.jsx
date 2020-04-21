import React, { useState, useEffect } from 'react';
import './message.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMessage } from '../../redux/user/user.selector';

const Alert = ({ messageData }) => {
  const [bgcolor, setBgcolor] = useState();
  // const { type, message } = messageData;
  const close = (e) => {
    return (e.currentTarget.parentElement.className = 'close');
  };

  const messages = () => {
    if (messageData) {
      messageData.type === 'error'
        ? setBgcolor('red')
        : setBgcolor('var(--color-primary)');
    }
  };

  useEffect(() => {
    messages();
  }, [messages]);

  if (messageData) {
    return (
      <div className="message-section" style={{ backgroundColor: bgcolor }}>
        <span onClick={(e) => close(e)}>x</span>
        <div>
          <p>{messageData.message}</p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const mapStateToProps = createStructuredSelector({
  messageData: selectMessage,
});
export default connect(mapStateToProps)(Alert);
