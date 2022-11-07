import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Row, Input, Form, Button, Layout, Alert, Select } from "antd";
import { connect } from "react-redux";
import EventNavbar from "./EventNavbar";
import {
  loginAction,
  logoutAction,
  getMetaData,
} from "../../redux/actions/login/loginAction";
import SystemCheck from "./SystemCheck";
import Calibaration from "./Calibaration";
import EventHome from "./EventHome";
import EventWebGL from "./EventWebGL";
import { Carousel } from "react-responsive-carousel";
import Feedback from "./Feedback";
import EventWalletDetails from "./EventWalletDetails";
type MyProps = {
  inmemoryLanguage: any;
  logoutAction: any;
  loginAction: any;
  getMetaData: any;
  loginData: any;
  metaData: any;
  form: any;
  systemCheck: any;
};
type MyState = {
  captchaError: string;
  language: string;
};
class Event extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      captchaError: "",
      language: "en",
    };
  }

  renderRedirect = () => {
    if (!this.props.loginData.redirect) {
      return <Redirect to="/login" />;
    }
  };

  eventGLRedirect = () => {
    if (this.props.metaData.isValidated) {
      return <Redirect to="/eventGL" />;
    }
  };

  renderPage = () => {
    if (this.props.loginData.walletAddress) {
      if(this.props.loginData.savedWalletDetails) {
        return <EventHome />;
      } else {
        return <EventWalletDetails />;
      }
    } else {
      return <EventHome />;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <EventNavbar></EventNavbar>
        {this.renderRedirect()}
        {this.eventGLRedirect()}
        <div className="body-inner">
          <div
            id="page-banner-area"
            className="page-banner-area"
            style={{
              backgroundImage: "url(images/banner/leanr_bg.png)",
              minHeight: "50px",
            }}
          ></div>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  metaData: state.metaData,
  systemCheck: state.systemCheck,
});

const LoginuserForm = Form.create({ name: "Login" })(Event);

export default connect(mapStateToProps, {
  loginAction,
  logoutAction,
  getMetaData,
})(LoginuserForm);
