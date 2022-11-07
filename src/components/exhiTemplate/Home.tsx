import React, { Component, useState, useCallback } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Row, Input, Form, Button, Layout, Alert, Select } from "antd";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import ConnectWalletButton from "./ConnectWalletButton";
import {
  loginAction,
  logoutAction,
  getMetaData,
} from "../../redux/actions/login/loginAction";
import landLogo from "./nlc_land_logo.png";
import polygonLogo from "./polygon_ether.png";
import "./Home.css";
type MyProps = {
  inmemoryLanguage: any;
  logoutAction: any;
  loginAction: any;
  getMetaData: any;
  loginData: any;
  metaData: any;
  form: any;
};
type MyState = {
  captchaError: string;
  language: string;
  captchaValue: string;
  toastLoaded: boolean;
};

class Home extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      captchaError: "",
      language: "en",
      captchaValue: "",
      toastLoaded: false,
    };
  }

  renderRedirect = () => {
    if (this.props.loginData.redirect) {
      switch (this.props.loginData.roleName) {
        case "Visitor":
          return <Redirect to="/event" />;
        case "Exhibitor":
          return <Redirect to="/dashboard" />;
        case "Admin":
          return <Redirect to="/admindashboard" />;
        default:
          return <Redirect to="/event" />;
      }
    }
  };

  addressChanged = (address) => {
    if (address.startsWith("0x")) {
      if(localStorage.getItem("chainName")==="Unsupported"){

      } else {
        this.props.loginAction({
          userName: "adheepism@gmail.com",
          password: "welcome1",
          address,
        });
        localStorage.setItem("currentWallet", address);
      }
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div>
          <div className="body-inner">
            <section
              className="main-slider owl-carousel"
            >
              <div
                className="banner-item overlay"
                style={{ backgroundImage: "url(images/hero_area/banner3.jpg)" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 mx-auto">
                      <div
                        className="banner-content-wrap text-left"
                        style={{
                          padding: "100px 0 200px",
                          alignContent: "flex-start",
                        }}
                      >
                        <h1 style={{ color: "white" }}>NxtLand Club</h1>
                        {/* <img src="images/logos/prop_expo.jpg" alt="" style={{width:'100%',padding:'0px 50px'}}/> */}
                        <p
                          style={{
                            color: "#fff",
                            fontSize: "25px",
                            fontWeight: "bolder",
                            lineHeight: "1.5em",
                          }}
                        >
                          World's first open Metaverse
                        </p>
                        <p
                          style={{
                            color: "#fff",
                            fontSize: "20px",
                            fontWeight: "normal",
                            lineHeight: "1.5em",
                            width: "250px!important;",
                          }}
                        >
                          Explore the virutal world, Expo, Summit or
                          any social gathering as your NFT avatar. We support NFT
                          collections from both Polygon and Ethereum. Earn points 
                          by playing games and attending events, then convert them to 
                          real world coupons and assets
                        </p>

                        <div className="banner-btn">
                          {Boolean(window.ethereum) ? (
                            <ConnectWalletButton
                              onChange={this.addressChanged}
                            />
                          ) : undefined}
                        </div>
                        {Boolean(window.ethereum) ? (
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "30px",
                              fontWeight: "bolder",
                              lineHeight: "1.5em",
                              marginLeft: "10%",
                            }}
                          >
                            or
                          </p>
                        ) : undefined}
                        <div className="banner-btn">
                          {false ? (
                            <NavLink
                              className="btn fill"
                              style={{
                                backgroundColor: "#ff007a",
                                border: "0px",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: 700,
                              }}
                              to="/register"
                            >
                              Register
                            </NavLink>
                          ) : undefined}

                          <NavLink
                            className="btn fill"
                            to="/inviteLogin"
                            style={{
                              color: "white",
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Login via Invite
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mx-auto">
                      <div className="text-right">
                        <img
                          src={landLogo}
                          className="move nlc-land-logo"
                        ></img>
                        <h3 style={{color: 'white'}} className="leftbox">Powered By : </h3>
                        <img
                          src={polygonLogo}
                          className="middlebox"
                        ></img>
                      </div>
                      {/* Banner content wrap end */}
                    </div>
                    {/* col end*/}
                  </div>
                  {/* row end*/}
                </div>
                {/* Container end */}
              </div>
              {/* banner item end*/}
            </section>
            <section className="ts-event-outcome">
              <div className="row">
                <div className="col-md-12 col-lg-12 text-center">
                  \
                  <h3 style={{ color: "wheat" }}>
                    To schedule a demo of our open Metaverse visit
                    <a
                      style={{ color: "red" }}
                      href="https://techfully.io/"
                      target="_blank"
                    >
                      {" "}
                      Techfully
                    </a>{" "}
                    or call +91 9976 920 285
                  </h3>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  metaData: state.metaData,
});

const LoginuserForm = Form.create({ name: "Login" })(Home);

export default connect(mapStateToProps, {
  loginAction,
  logoutAction,
  getMetaData,
})(LoginuserForm);
