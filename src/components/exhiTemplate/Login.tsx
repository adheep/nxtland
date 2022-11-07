import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Row, Input, Form, Button, Layout, Alert, Select } from "antd";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import {
  loginAction,
  logoutAction,
  getMetaData,
} from "../../redux/actions/login/loginAction";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

type MyProps = {
  inmemoryLanguage: any;
  logoutAction: any;
  loginAction: any;
  getMetaData: any;
  loginData: any;
  metaData: any;
  form: any;
  resetStatus: any;
};
type MyState = {
  captchaError: string;
  language: string;
  captchaValue: any;
  toastLoaded: any;
};
const recaptchaRef = React.createRef();

class Login extends React.Component<MyProps, MyState> {
  componentWillMount() {
    this.props.logoutAction();
  }

  componentDidMount() {
    this.setState(
      {
        toastLoaded: false
      }
    )
  }

  constructor(props: any) {
    super(props);
    this.state = {
      captchaError: "",
      language: "en",
      captchaValue: "",
      toastLoaded: false
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        if (this.state.captchaValue !== "")  {
          this.props.loginAction(values);
        } else {
          this.setState({
            captchaError: "Please complete the Capcha",
          });
        }
      } else {
        console.log("error");
      }
    });
  };

  onChange = (value) => {
    this.setState({
      captchaError: "",
      captchaValue: value,
    });
  };

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

  toast = () => {
    if(!this.state.toastLoaded && this.props.resetStatus.otpValidated) {
      toast.success('Your password reset successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      this.setState({
        toastLoaded: true
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Navbar></Navbar>
        {this.renderRedirect()}
        {this.toast()}
        <div className="body-inner">
          <div
            id="page-banner-area"
            className="page-banner-area"
            style={{
              backgroundImage: "url(images/hero_area/banner_bg.jpg)",
              minHeight: "90px",
            }}
          ></div>
          {/* Page Banner end */}
          <section className="ts-contact-form">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h2 className="section-title text-center">Login</h2>
                </div>
                {/* col end*/}
              </div>
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <Form
                    onSubmit={this.handleSubmit}
                    id="123"
                    className="form-signin"
                  >
                    <div className="">
                      <div className="form-info">
                        <Form.Item>
                          {getFieldDecorator("userName", {
                            rules: [
                              {
                                message: "Please enter Email",
                                required: true,
                              },
                              {
                                max: 100,
                                message:
                                  "Email should be accept maximum 35 characters",
                              },
                              {
                                message: "Email should be minimum 4 characters",
                                min: 4,
                              },
                            ],
                          })(
                            <div className="row">
                              <div className="col-md-6 mx-auto">
                                <div className="form-group" style={{marginBottom:"6px"}}>
                                  <Input
                                    className="form-control form-control-email"
                                    placeholder="Username"
                                    name="email"
                                    id="email"
                                    type="email"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Form.Item>
                      </div>
                    </div>
                    <div className="">
                      <div className="form-info">
                        <Form.Item>
                          {getFieldDecorator("password", {
                            rules: [
                              {
                                message: "Please enter Password",
                                required: true,
                              },
                              {
                                max: 25,
                                message:
                                  "Password should be accept maximum 25 characters",
                              },
                              {
                                message:
                                  "Password should be minimum 5 characters",
                                min: 5,
                              },
                            ],
                          })(
                            <div className="row">
                              <div className="col-md-6 mx-auto">
                                <div className="form-group" style={{marginBottom:"6px"}}>
                                  <Input
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    id="subject"
                                    type="password"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Form.Item>
                      </div>
                    </div>

                    <div className="text-center" style={{ color: "red" }}>
                      {this.props.loginData.message}
                    </div>
                    <div className="row" style={{justifyContent: 'center'}}>
                      <div className="col-md-12 col-lg-6" style={{marginLeft: '5%'}}>
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6Le58rIZAAAAACt9kATvOmTggEmJOLE1H_xYdh9M"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="captchaerror" style={{textAlign:'center',color:'red'}}>
                      {this.state.captchaError}
                    </div>
                    <div className="text-center">
                      <br />
                      <Button
                        className="btn"
                        style={{
                          color: "white",
                          fontSize: "16px",
                          fontWeight: 700,
                          backgroundColor: "#d20055",
                        }}
                        htmlType="submit"
                      >
                        Login
                      </Button>
                    </div>
                    <br></br>
                    {false?(<div className="row">
                      <div className="col-md-6 mx-auto" style={{textAlign:'center', color: '#3b1d82', fontWeight: 'bold'}}>
                        <span>
                          Forgot your password?{" "}
                          <NavLink to="/reset">Click here</NavLink>
                          <br></br>
                          or
                        </span>
                      </div>
                    </div>):undefined}
                    {false?(<div className="row">
                      <div className="col-md-6 mx-auto" style={{textAlign:'center', color: '#3b1d82', fontWeight: 'bold'}}>
                        <span>
                          Would you like to register?{" "}
                          <NavLink to="/register">Sign up</NavLink>
                        </span>
                      </div>
                    </div>):undefined}                    
                  </Form>
                </div>
              </div>
            </div>
            <div className="speaker-shap">
              <img
                className="shap1"
                src="images/shap/home_schedule_memphis2.png"
                alt=""
              />
            </div>
          </section>
          {/* ts footer area start*/}

          {/* ts footer area end*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  metaData: state.metaData,
  resetStatus: state.resetStatus
});

const LoginuserForm = Form.create({ name: "Login" })(Login);

export default connect(mapStateToProps, {
  loginAction,
  logoutAction,
  getMetaData,
})(LoginuserForm);
