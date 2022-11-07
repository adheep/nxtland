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
  render() {
    return (
      <div>
        {/* Header start */}
        {this.isLoggedIn()}
        <header id="header" className="header header-transparent webglHeader" style={{backgroundImage: 'linear-gradient(grey, transparent)'}}>
          <div className="container" style={{ maxWidth: "inherit" }}>
            <nav
              className="navbar navbar-expand-lg navbar-light"
              style={{ height: "50px" }}
            >
              {/* logo*/}
              <a className="navbar-brand" href="#">
                <img src="images/logos/logo.png" alt="" style={{width: '80px'}}/>
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
