import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../../assets/Wd-logo.svg';
import Logo2 from '../../assets/icon.png';
import './header.styles.scss';
import Navigation from '../navigation/navigation.component';
import { withRouter } from 'react-router-dom';
import '../navigation/navigation.styles.scss';
const Header = (props) => {

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
          <img className="header__logo--img-1" src={Logo1} alt="" />
          <img className="header__logo--img-2" src={Logo2} alt="" />
        </Link>
      </div>
      {/* <!-- NAV MENU --> */}
      <Navigation />
    </div>
  );
};
export default withRouter(Header);
