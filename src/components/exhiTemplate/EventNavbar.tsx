import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "antd";
import { logoutAction } from "../../redux/actions/login/loginAction";

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
};

class EventNavbar extends React.Component<MyProps, MyState> {
  logout = () => {
    this.props.logoutAction();
  };
  isLoggedIn = () => {
    if (this.props.loginData.isLoggedIn == false) {
      return <Redirect to="/" />;
    }
  };
  showDisplayName = () => {
    if(this.props.loginData["walletAddress"]){
      let walletDetails:string = localStorage.getItem("wallet-"+this.props.loginData["walletAddress"]);
      if(walletDetails && !walletDetails.endsWith("null")) {
        let walletObj = JSON.parse(walletDetails);
        if(walletObj["displayName"]===undefined) {
          let walletAddress = this.props.loginData["walletAddress"];
          let firstPart = walletAddress.substring(0, 5);
          let lastPart = walletAddress.substring(walletAddress.length-5,walletAddress.length);
          return firstPart + "..." + lastPart;
        } else {
          return walletObj["displayName"];
        }
      } else {
        let walletAddress = this.props.loginData["walletAddress"];
        let firstPart = walletAddress.substring(0, 5);
        let lastPart = walletAddress.substring(walletAddress.length-5,walletAddress.length);
        return firstPart + "..." + lastPart;
      }
    } else if(this.props.loginData["userDetail"]) {
      return this.props.loginData["userDetail"]["name"];
    } else {
      return "";
    }
  }
  render() {
    return (
      <div>
        {/* Header start */}
        {this.isLoggedIn()}
        <header id="header" className="header header-transparent" style={{
              backgroundImage: "url(images/banner/leanr_bg.png)",
              minHeight: "50px",
            }}>
          <div className="container" style={{ maxWidth: "inherit" }}>
            <nav
              className="navbar navbar-expand-lg navbar-light"
              style={{ height: "50px" }}
            >
              {/* logo*/}
              <a className="navbar-brand" href="#">
                <img src="images/logos/nlc_logo.png" alt="" style={{width: '40px'}} />
              </a>
              <div className="collapse navbar-collapse" id="navbarNavDropdown" >
                <ul className="navbar-nav ml-auto" style={{flex:1, justifyContent: 'flex-start'}}>
                  <li>
                    <NavLink className="active" to="/">
                    <i
                  className="fa fa-home"
                  aria-hidden="true"
                  style={{ color: "white", fontSize: 25 }}
                ></i>
                      &nbsp;Home
                    </NavLink>
                  </li>
                </ul>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarNavDropdown"
                style={{ flex: 1, flexFlow: "row", justifyContent: "flex-end" }}
              >
                <span style={{ color: "white", fontSize: "18px!important" }}>
                  <img
                    className="schedule-slot-speakers"
                    src="images/online.png"
                    alt="online"
                    style={{
                      padding: "1px",
                      width: "15px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  &nbsp;
                  {this.showDisplayName()}
                </span>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <i
                  className="fa fa-sign-out"
                  aria-hidden="true"
                  style={{ color: "white", fontSize: 25 }}
                  onClick={this.logout}
                ></i>
              </div>
            </nav>
          </div>
          {/* container end*/}
        </header>
        {/*/ Header end */}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  metaData: state.metaData,
});

const LoginuserForm = Form.create({ name: "Login" })(EventNavbar);

export default connect(mapStateToProps, { logoutAction })(LoginuserForm);
