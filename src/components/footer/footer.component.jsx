import React from 'react';
import './footer.styles.scss';
import { connect } from 'react-redux';
import Logo from '../../assets/icon.png';
// import { createStructuredSelector } from 'reselect';

const Footer = () => {
  // const device = window.matchMedia('(max-width: 600px)');
  // const [width, setWidth] = useState();
  // useMemo(() => {
  //   menu && device.matches ? setWidth('100%') : setWidth('93%');
  //   if (!menu)
  //     if (device.matches) {
  //       setWidth('90%');
  //     } else {
  //       setWidth(null);
  //     }
  // }, [device.matches, menu]);
  // // useEffect(() => {}, [memorizedValue]);

  return (
    <footer className="footer">
      <div className="footer__content footer__content--1">
        {/* <img src={Logo} alt="" /> */}
        <h5>
          Powered by <a href="https://www.cre8tivetech.com/">@Cre8tiveTech</a>
        </h5>
        <p>&#169; copyright {new Date().getFullYear()}</p>
      </div>
      <div className="footer__content footer__content--2 ">
        <h5>Social Links</h5>
        <div>
          <a href="https://web.facebook.com/cre8tivetech">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/cre8tive_tech/">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/cre8tive_tech">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

// const mapStateToProps = createStructuredSelector({
//   menu: selectMenu,
// });
const mapDispatchToProps = (dispatch) => ({
  // setMenu: (status) => dispatch(setMenu(status)),
});

export default connect(null, mapDispatchToProps)(Footer);
