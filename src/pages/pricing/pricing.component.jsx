import React, { useState, useEffect, useCallback } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import '../pricing/pricing.styles.scss';
import { Link, withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart, checkUserSession } from '../../redux/user/user.actions';
import free from '../../assets/message.svg';
import basic from '../../assets/plane(1).svg';
import premium from '../../assets/rocket.svg';
import Price from './price.component';

const Pricing = ({ user, signOutStart, checkUserSession }) => {
  const [loadBar, setLoadBar] = useState(0);
  // const [ref, setRef] = useState({
  //   basicREf: `basicMonthly-${Date.now()}`,
  //   premiumREf: `premiumMonthly-${Date.now()}`,
  // });
  const [logout, setLogout] = useState('Logout');
  const [plan, setPlan] = useState({
    amount: {
      freeP: 0.0,
      basicP: 4.99,
      premiumP: 7.99,
    },
    ref: {
      basicREf: `basicMonthly-${Date.now()}`,
      premiumREf: `premiumMonthly-${Date.now()}`,
    },
    type: 'per month',
  });

  const { amount, ref, type } = plan;
  const { freeP, basicP, premiumP } = amount;
  const { basicREf, premiumREf } = ref;
  const freeAmount = freeP.toString().split('.');
  // const basicAmount = basicP.toString().split('.');
  // const premiumAmount = premiumP.toString().split('.');
  const [planSelect, setPlanSelect] = useState({
    month: 'plan-type btn active',
    year: 'plan-type btn',
  });

  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };

  const signOut = () => {
    setLogout('Logging out...');
    signOutStart();
    setTimeout(() => {
      setLogout('Logout');
    }, 3000);
  };

  useEffect(() => {
    checkUserSession();
    startLoader();
  }, [checkUserSession]);

  const monthly = () => {
    setPlan({
      amount: {
        freeP: 0,
        basicP: 4.99,
        premiumP: 7.99,
      },
      ref: {
        basicREf: `basicMonthly-${Date.now()}`,
        premiumREf: `premiumMonthly-${Date.now()}`,
      },
      type: 'per month',
    });
    setPlanSelect({
      month: 'plan-type btn active',
      year: 'plan-type btn',
    });
  };

  const yearly = () => {
    setPlan({
      amount: {
        freeP: 0,
        basicP: 49.99,
        premiumP: 99.99,
      },
      ref: {
        basicREf: `basicAnnually-${Date.now()}`,
        premiumREf: `premiumAnnually-${Date.now()}`,
      },
      type: 'per year',
    });
    setPlanSelect({
      month: 'plan-type btn',
      year: 'plan-type btn active',
    });
  };

  const baseData = {
    img: basic,
    amount: basicP,
    email: user.email,
    reference: basicREf,
    type,
    classname: 'basic',
    classnameImg: 'basic-img',
    classnameBg: 'basic-bg',
    opt: {
      opt1: 'fa fa-check basic',
      opt2: 'fa fa-check basic',
      opt3: 'fa fa-check basic',
      opt4: 'fa fa-times basic',
      opt5: 'fa fa-times basic',
      opt6: 'fa fa-check basic',
    },
  };

  const premiumData = {
    img: premium,
    amount: premiumP,
    email: user.email,
    reference: premiumREf,
    type,
    classname: 'premium',
    classnameImg: 'premium-img',
    classnameBg: 'premium-bg',
    opt: {
      opt1: 'fa fa-check premium',
      opt2: 'fa fa-check premium',
      opt3: 'fa fa-check premium',
      opt4: 'fa fa-check premium',
      opt5: 'fa fa-check premium',
      opt6: 'fa fa-check premium',
    },
  };

  return (
    <div className="profile-section">
      <LoadingBar
        progress={loadBar}
        height={3}
        color="linear-gradient(92deg, #038125 0%, #fbff00 100%)"
        onLoaderFinished={() => onLoaderFinished}
      />
      <div className="profile-section__box card">
        <div className="profile-section__box--details">
          <div className="profile-section__box--details--left">
            <Link className="home" to="/">
              <i
                className="fad fa-home"
                style={{ color: 'var(--color-primary)' }}
              ></i>
              <p>Home</p>
            </Link>
            <div className="profile-section__box--details--left-box">
              <div className="profile-section__box--details--left-box-image">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <Link to="/profile">
                <div className="profile-section__box--details--left-box-user">
                  <p className="profile-section__box--details--left-box-user_name">
                    {user.full_name}{' '}
                    {user.is_subscribed ? (
                      <i
                        className="fad fa-badge-check"
                        style={{ color: 'var(--color-primary)' }}
                      ></i>
                    ) : null}
                  </p>
                  <p className="profile-section__box--details--left-box-user_email">
                    <small> {user.email} </small>
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="profile-section__box--details--right">
            <p onClick={() => signOut()}>
              <strong>{logout}</strong>
            </p>
            {user && user.is_email_confirm ? (
              <div>
                <Link to="/download-history">
                  <i
                    className="fad fa-badge-dollar"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  Download History
                </Link>
              </div>
            ) : null}
            <div>
              <Link to="/pricing">
                <i
                  className="fad fa-badge-dollar"
                  style={{ color: 'var(--color-primary)' }}
                ></i>
                Pricing
              </Link>
            </div>
            {user && user.is_email_confirm ? (
              <div>
                <Link to="/change-password">
                  <i
                    className="fad fa-user-lock"
                    style={{ color: 'var(--color-primary)' }}
                  ></i>
                  Change Password
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <div className="pricing-section_box">
          <div className="pricing-section_box--header">
            <p>
              <strong>PRICING</strong>
            </p>
            <p>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
            <div className="plan-type">
              <div className={planSelect.month} onClick={monthly}>
                Monthly
              </div>
              <div className={planSelect.year} onClick={yearly}>
                Yearly
              </div>
            </div>
          </div>
          <div className="pricing-section_box--container">
            <div className="pricing-section_box--container_box free">
              <div className="pricing-section_box--container_box-top free-img">
                <div className="pricing-section_box--container_box-top-title">
                  <h2>FREE</h2>
                </div>
                <img src={free} alt="" />
              </div>
              <div className="pricing-section_box--container_box-bottom free">
                <div className="sub-type">
                  <h1>
                    <span>$</span>
                    {freeAmount[0]}
                  </h1>
                  <h3>{type}</h3>
                </div>

                <div className="plan-texts">
                  {/* <p className="free">&#10004;</p> */}
                  <i className="fa fa-check free"></i>
                  <p>Download unlimited posts</p>
                </div>
                <div className="plan-texts">
                  <i className="fa fa-times free"></i>
                  <p>Dowload post by username</p>
                </div>
                <div className="plan-texts">
                  <i className="fa fa-times free"></i>
                  <p>Dowload post by hashtag</p>
                </div>
                <div className="plan-texts">
                  <i className="fa fa-times free"></i>
                  <p>Dowload stories post</p>
                </div>
                <div className="plan-texts">
                  <i className="fa fa-times free"></i>
                  <p>Dowload highlights post</p>
                </div>
                <div className="plan-texts">
                  <i className="fa fa-times free"></i>
                  <p>Check download history</p>
                </div>
                {/* <div className="plan-texts">
                  <p className="free">&#215;</p>
                  <p>Check download history</p>
                </div> */}
                <div className="plan">
                  <Link to="/">
                    <div className="plan-btn btn free-bg">Get now</div>
                  </Link>
                </div>
              </div>
            </div>

            <Price {...baseData} />
            <Price {...premiumData} />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  checkUserSession: () => dispatch(checkUserSession()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Pricing)
);
