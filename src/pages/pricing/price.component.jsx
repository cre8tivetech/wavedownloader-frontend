import React from "react";
import { withRouter } from "react-router-dom";
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import { userPaymentStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const Price = ({
  img,
  amount,
  email,
  reference,
  type,
  classname,
  classnameImg,
  classnameBg,
  opt,
  userPaymentStart
}) => {
  console.log(email);
  const key = process.env.REACT_APP_RAVE_PUBLIC_KEY; // RavePay PUBLIC KEY
  const amountText = amount.toString().split(".");
  const { opt1, opt2, opt3, opt4, opt5, opt6 } = opt;
  const config = {
    txref: reference,
    customer_email: email,
    // customer_phone: "234099940409",
    amount: amount,
    currency: "USD",
    PBFPubKey: key,
    onSuccess: response => {
      console.log("fgfffff");
      callback(response);
    },
    onClose: () => {
      console.log("Payment closed");
    }
  };
  const callback = response => {
    console.log(response);
    const txref = response.tx.txRef;
    const chargeResponse = response.tx.chargeResponseCode;
    if (chargeResponse === "00" || chargeResponse === "0") {
      console.log("txref: ", txref);
      userPaymentStart(txref);
      // window.location = "https://your_URL/api/v1/rave/verify?txref="+txref; //Add your success page here
    } else {
      console.log("Payment Failed");
    }
  };
  return (
    <div className={"pricing-section_box--container_box " + classname}>
      <div className={"pricing-section_box--container_box-top " + classnameImg}>
        <div className="pricing-section_box--container_box-top-title">
          <h2>{classname}</h2>
        </div>
        <img src={img} alt="" />
      </div>
      <div className={"pricing-section_box--container_box-bottom " + classname}>
        <div className="sub-type">
          <h1>
            <span>$</span>
            {amountText[0]}
            <span>.{amountText[1]}</span>
          </h1>
          <h3>{type}</h3>
        </div>

        <div className="plan-texts">
          <i className={opt1}></i>
          <p>Download unlimited posts</p>
        </div>
        <div className="plan-texts">
          <i className={opt2}></i>
          <p>Dowload post by username</p>
        </div>
        <div className="plan-texts">
          <i className={opt3}></i>
          <p>Dowload post by hashtag</p>
        </div>
        <div className="plan-texts">
          <i className={opt4}></i>
          <p>Dowload stories post</p>
        </div>
        <div className="plan-texts">
          <i className={opt5}></i>
          <p>Dowload highlights post</p>
        </div>
        <div className="plan-texts">
          <i className={opt6}></i>
          <p>Check download history</p>
        </div>
        {/* <div className="plan-texts">
                  <p className="free">&#215;</p>
                  <p>Check download history</p>
                </div> */}
        <div className="plan">
          <RaveProvider {...config}>
            <RavePaymentButton className={"plan-btn btn " + classnameBg}>
              Buy now
            </RavePaymentButton>
          </RaveProvider>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userPaymentStart: txref => dispatch(userPaymentStart(txref))
});
export default connect(null, mapDispatchToProps)(Price);
