import React from "react";
import "./css/login.css"
import "./css/font-awesome-4.7.0/css/font-awesome.css"
import "./js/api.js"
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../../history';
import message from '../messages/message.json'
import { loginAction, logoutAction, getMetaData } from '../../redux/actions/login/loginAction';
import { Row, Input, Form, Button, Layout,Alert,Select } from 'antd';
import  Captcha  from "./captcha";
import PropTypes from 'prop-types';
import Global from '../layout/Global/Global';
import i18n, { lang, setInitialLocale } from '../../i18n'
import { locale } from "i18n-js";
import { inmemoryLanguage } from "../../redux/actions/language/languageAction";
import { NavLink } from "react-router-dom";

const { Option } = Select;

type MyProps = {
  inmemoryLanguage: any,
  logoutAction: any,
  loginAction:any,
  getMetaData: any,
  loginData:any,
  metaData: any,
  form: any
};
type MyState = {
  captchaError: string,
  language: string
};
interface document {
  [key:string]: any;
}

class Login extends React.Component<MyProps,MyState> {
    componentWillMount() {
        this.props.logoutAction();
        this.render();
      }

      constructor(props:any){
        super(props)
        this.state = {
            captchaError: '',
            language: 'en'
        }
        this.props.getMetaData({});
    }


    handleSelect = (e:any) =>{
      localStorage.setItem("language",e);
      i18n.locale=e;
      this.setState({language:e})
      //this.props.inmemoryLanguage(e);
     // setInitialLocale(locale(e));

    };

      handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:any, values:any) => {
            if (!err) {
                let recaptcha = (document.forms as any)["myForm"]["g-recaptcha-response"].value;
                if (recaptcha == "") {
                  // alert(" Required Captcha");
                    //let captchaError=message.captchaErrorMessage;
                    let captchaError= i18n.t(lang.error_messages["captcha_error_message"]);
                    this.setState({captchaError});
                    //this.setState({captchaError:message.captchaErrorMessage});
                    return false;
                }
                else if(recaptcha!=""){
                  let captchaError = "";
                  this.setState({captchaError});
                }
                this.props.loginAction(values);
            }
        });
    };

    renderRedirect = () => {
      if (this.props.loginData.redirect) {
          return <Redirect to='/home'/>
      }
    }

    render() {
      let title = '';
      if(this.props.metaData.other_metadata){
        title = this.props.metaData.other_metadata.title;
      }
      const { getFieldDecorator } = this.props.form;
      return (
          <div className="login-layout">
            <div className="login">
              {this.renderRedirect()}
              <div className="login-content">
                <div className="row exp-frm-info" style={{width: '95%'}}>
                  <div className="col-md-12">
                    <img src={require("./images/livfair.png")} alt="banner" className="img-responsive-banner" style={{width:'1000px'}} />
                  </div>
                </div>
              </div>
              <div className="login-form">
                <div className="login-form-section" style={{width: '400px'}}>
                  <h1 className="login-content-title">{i18n.t(lang.labels["login"])}</h1>
                  <p></p>
                    <Form onSubmit={this.handleSubmit} className="form-signin">
                            <div className="form-group mail-box">
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                <div className="form-info">
                                <label htmlFor="email">{i18n.t(lang.labels["email_address"])}</label>
                                <Form.Item>
                                {getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            message: 'Please enter Email',
                                            required: true
                                        },
                                        {
                                            max: 100,
                                            message: "Email should be accept maximum 35 characters"
                                        },
                                        {
                                            message: "Email should be minimum 4 characters",
                                            min: 4,
                                        }
                                    ],
                                    })
                                (
                                <Input className="form-control" id="email" name="email" placeholder="Enter email address"  allowClear/>)}
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group password-box">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        <div className="form-info">
                            <Form.Item>
                              {getFieldDecorator('password', {
                                  rules: [
                                      {
                                        message: 'Please enter Password',
                                        required: true
                                      },
                                      {
                                          max: 25,
                                          message: "Password should be accept maximum 25 characters"
                                      },
                                      {
                                        message: "Password should be minimum 5 characters",
                                        min: 5
                                      }
                                  ],
                                })
                                (<Row type="flex" justify="space-between">
                                <Input.Password  className="form-control" id="password" name="password" placeholder="Enter password"  />
                                </Row>)}
                              </Form.Item>
                          </div>
                          </div>
                          <div className="loginerror">{this.props.loginData.message}</div>
                          <Captcha></Captcha>
                          <div className="captchaerror">{this.state.captchaError}</div>
                          <div className="btn-action">
                                <a href="javascript:void(0);" title="Click to get reset password info" className="login-forget-password">{i18n.t(lang.labels["forgot_password"])}</a>
                          <Button className="login-form-btn" style={{backgroundColor: '#d80d5c'}} htmlType="submit">
                          {i18n.t(lang.buttons["login_now"])}
                        </Button>
                        </div>
                      </Form>
                </div>
              </div>
            </div>
          </div>
      )
  }
}

const mapStateToProps = (state:any) => ({ loginData: state.loginData, metaData: state.metaData });

const LoginuserForm = Form.create({ name: 'Login' })(Login);

export default connect(mapStateToProps, { loginAction,logoutAction, getMetaData, inmemoryLanguage })(LoginuserForm);
