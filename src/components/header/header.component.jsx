import React from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../../assets/img/logo1.png';
import Logo2 from '../../assets/icon.png';
import './header.styles.scss';
import Navigation from '../navigation/navigation.component';
import { withRouter } from 'react-router-dom';
import '../navigation/navigation.styles.scss';
const Header = ({ history }) => {

  // <!-- HEADER -->
  return (
    <div className="header">
      <div className="container">
        {history.location.pathname!=='/'&&
          history.location.pathname!=='/profile'?
        (<i
          onClick={history.goBack}
          className="fad fa-long-arrow-left back"
          style={{ color: 'var(--color-primary-light)' }}
        ></i>): null}
        <div className="logo">
          <Link to="/">
            <img className="logo--img-1" src={Logo1} alt="" />
            <img className="logo--img-2" src={Logo2} alt="" />
          </Link>
        </div>
      </div>
      {/* <!-- NAV MENU --> */}
      <Navigation />
    </div>
  );
};
export default withRouter(Header);
