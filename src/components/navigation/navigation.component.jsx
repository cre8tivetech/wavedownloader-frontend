import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.actions';
import './navigation.styles.scss';

const Navigation = ({ user, signOutStart }) => {
  const [mode, setMode] = useState(localStorage.getItem('mode'));
  const [logout, setLogout] = useState('Logout');
  const history = useHistory();
  const checkMode = () => {
    if (mode === 'dark') {
      const root = document.querySelector(':root');
      const toggle = document.querySelector('.toggle');
      toggle.classList.add('dark-mode');
      root.style.setProperty('--color-bg', '#030805');
      root.style.setProperty('--color-bg-2', '#050c07');
      root.style.setProperty('--color-light', '#030805');
      root.style.setProperty('--color-card', '#050e08');
      root.style.setProperty('--color-text-1', '#a3a3a3');
      root.style.setProperty('--color-text-2', '#cccccc');
      root.style.setProperty('--color-text-4', '#b8b8b8');
      root.style.setProperty('--color-btn-hover', '#0b1d12');
      root.style.setProperty('--scrollbarBG', '#020503');
      root.style.setProperty('--box-shadow', 'rgba(255,255,255,0.35)');
    }
  };

  const navToggle = (e) => {
    let menu = document.getElementById('openSidebarMenu').checked;
    if (menu) document.getElementById('openSidebarMenu').checked = false;
    // let ht = window
    //   .getComputedStyle(elem, null)
    //   .getPropertyValue('transform');
  };

  useEffect(() => checkMode(), []);
  const signOut = () => {
    setLogout('Logging out...');
    signOutStart();
    setTimeout(() => {
      history.push('/');
      setLogout('Logout');
    }, 3000);
  };
  const toggleMode = () => {
    const root = document.querySelector(':root');
    const toggle = document.querySelector('.toggle');
    // const bgColor = root.style.getPropertyValue('--bg-color')
    if (mode === 'dark') {
      root.style.setProperty('--color-bg', '#fcfcfc');
      root.style.setProperty('--color-bg-2', '#eeeeee');
      root.style.setProperty('--color-light', '#ffffff');
      root.style.setProperty('--color-card', '#f4f2f2');
      root.style.setProperty('--color-text-1', '#777777');
      root.style.setProperty('--color-text-2', '#242424');
      root.style.setProperty('--color-text-4', '#e6e1e1');
      root.style.setProperty('--color-btn-hover', '#a8a8a8');
      root.style.setProperty('--scrollbarBG', '#e4ffeb');

      root.style.setProperty('--box-shadow', 'rgba(0,0,0,0.35)');
      localStorage.setItem('mode', 'light');
      setMode('light');
    } else {
      root.style.setProperty('--color-bg', '#030805');
      root.style.setProperty('--color-bg-2', '#050c07');
      root.style.setProperty('--color-light', '#030805');
      root.style.setProperty('--color-card', '#050e08');
      root.style.setProperty('--color-text-1', '#a3a3a3');
      root.style.setProperty('--color-text-2', '#cccccc');
      root.style.setProperty('--color-text-4', '#b8b8b8');
      root.style.setProperty('--color-btn-hover', '#0b1d12');
      root.style.setProperty('--scrollbarBG', '#020503');

      root.style.setProperty('--box-shadow', 'rgba(255,255,255,0.35)');
      localStorage.setItem('mode', 'dark');
      setMode('dark');
    }
    toggle.classList.toggle('dark-mode');
  };
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
      <div className="navigation__sidebarMenu" id="menu">
        <ul className="navigation__sidebarMenu--inner">
          {user ? (
            <li onClick={(e) => navToggle(e)}>
              <Link className="profile" to="/profile">
                <div>{user.full_name.charAt(0).toUpperCase()}</div>
                <p>
                  {user.full_name} <small>{user.email}</small>
                </p>
              </Link>
            </li>
          ) : (
            <li onClick={(e) => navToggle(e)}>
              <Link className="login" to="/signin">
                <i
                  className="fad fa-lock"
                  style={{ color: 'var(--color-primary)' }}
                ></i>
                <p>Login</p>
              </Link>
            </li>
          )}

          <li onClick={(e) => navToggle(e)}>
            <Link className="links" to="/">
              <i
                className="fad fa-home"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Home</p>
            </Link>
          </li>
          <li onClick={(e) => navToggle(e)}>
            <Link className="links" to="/profile">
              <i
                className="fad fa-user"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Profile</p>
            </Link>
          </li>
          <li onClick={(e) => navToggle(e)}>
            <Link className="links" to="/pricing">
              <i
                className="fad fa-usd-circle"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Pricing</p>
            </Link>
          </li>
          <li>
            <div className="toggle-wrapp">
              <i
                className="fad fa-palette"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Dark Mode</p>
              <span className="toggle" onClick={toggleMode}></span>
            </div>
          </li>
        </ul>
        {user ? (
          <div
            className="navigation__sidebarMenu--bottom"
            onClick={() => signOut()}
          >
            <p>{logout}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
