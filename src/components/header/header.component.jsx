import React from 'react';
import { Link } from 'react-router-dom';
import YourSvg from '../../assets/Wd-logo.svg';
import './header.styles.scss';
import Navigation from '../navigation/navigation.component';
import { withRouter } from 'react-router-dom';
import '../navigation/navigation.styles.scss';
const Header = props => {
  console.log(props.history);
  // <!-- HEADER -->
  return (
    <div className="header">
      <div className="header__logo">
        <i
          onClick={props.history.goBack}
          className="fad fa-long-arrow-left back"
          style={{ color: 'var(--color-primary-light)' }}
        ></i>
        <Link to="/">
          <img className="header__logo--img" src={YourSvg} alt="" />
        </Link>

        {/* <p className="header__logo--text">Wave Downloader</p> */}
      </div>
      {/* <!-- NAV MENU --> */}
      <Navigation />
    </div>
  );
};

export default withRouter(Header);
