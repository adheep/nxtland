import React, { Component } from "react";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import { initSysCheck } from "../../redux/actions/systemCheck/systemCheckAction";
import SystemCheck from "./SystemCheck";
import Calibaration from "./Calibaration";

type MyProps = {
  loginData: any;
  initSysCheck: any;
  systemCheck: any;
};
type MyState = {
  systemCheck: boolean;
};

class EventHome extends React.Component<MyProps, MyState> {
  systemCheck = () => {
    this.props.initSysCheck();
  };

  render() {
    return (
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
              {this.props.systemCheck.systemCheck ? (
                <SystemCheck></SystemCheck>
              ) : (
                <Calibaration></Calibaration>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  systemCheck: state.systemCheck
});

const EventHomeForm = Form.create({ name: "SysCheck" })(EventHome);

export default connect(mapStateToProps, {
  initSysCheck,
})(EventHomeForm);
