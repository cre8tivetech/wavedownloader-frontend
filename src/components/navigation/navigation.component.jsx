import React from 'react';
import './navigation.styles.scss';

const Navigation = () => {
  return (
    // <!-- NAV MENU -->
    <div className="navigation">
      <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
      <label
        htmlFor="openSidebarMenu"
        className="navigation__sidebarIconToggle"
      >
        <div className="navigation__spinner navigation__diagonal navigation__part-1"></div>
        <div className="navigation__spinner navigation__horizontal"></div>
        <div className="navigation__spinner navigation__diagonal navigation__part-2"></div>
      </label>
      <div className="navigation__sidebarMenu">
        <ul className="navigation__sidebarMenu--inner">
          <li>
            <a href="./Instagram/index.html" target="_blank">
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/plavookac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/plavookac/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navigation;
