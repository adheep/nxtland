import React, { Component } from "react";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import { initSysCheck } from "../../redux/actions/systemCheck/systemCheckAction";
import SystemCheck from "./SystemCheck";
import Feedback from "./Feedback";
import EventNavbar from "./EventNavbar";

type MyProps = {
  loginData: any;
  initSysCheck: any;
  systemCheck: any;
};
type MyState = {
  systemCheck: boolean;
};

class EventFeedback extends React.Component<MyProps, MyState> {
  systemCheck = () => {
    this.props.initSysCheck();
  };

  render() {
    return (
      <div>
      `<EventNavbar></EventNavbar>
      <div
        className="banner-item"
        style={{
          backgroundImage: "url(images/speakers/speaker_bg.png)",
        }}
      >
        <div className="speaker-shap">
          <img
            className="shap1"
            src="images/shap/home_speaker_memphis1.png"
            alt=""
          />
          <img
            className="shap2"
            src="images/shap/home_speaker_memphis2.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-11 mx-auto">
              <Feedback></Feedback>
            </div>
          </div>
        </div>
      </div>`
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  systemCheck: state.systemCheck
});

const EventFeedbackForm = Form.create({ name: "SysCheck" })(EventFeedback);

export default connect(mapStateToProps, {
  initSysCheck,
})(EventFeedbackForm);
