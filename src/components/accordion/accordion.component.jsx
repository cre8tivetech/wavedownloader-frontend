/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import Chevron from './chevron';

import './accordion.styles.scss';

function Accordion(props) {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion__icon');
  const [setRotateColor, setRotateColorState] = useState('#777');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      // setActive === 'active' ? `${content.current.scrollHeight}px` : '0px',
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      // setActive === 'active' ? 'accordion__icon rotate' : 'accordion__icon',
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
    setRotateColorState(setActive === 'active' ? '#777' : '#fff');
    // if (setActive) {
    //   this.classList.toggle('active');
    //   this.nextElementSibling.classList.toggle('');
    // }
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <Chevron
          className={`${setRotate}`}
          width={10}
          fill={`${setRotateColor}`}
        />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
