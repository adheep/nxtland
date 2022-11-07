import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import {
  resetAction,
  validateOTP,
  resetValues
} from "../../redux/actions/login/ResetAction";
import {
  Form,
  Select,
} from "antd";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const { Option } = Select;
const recaptchaRef = React.createRef();
type MyProps = {
  inmemoryLanguage: any;
  resetAction: any;
  loginData: any;
  resetStatus: any;
  validateOTP: any;
  resetValues: any;
  form: any;
};
type MyState = {
  captchaError: string;
  language: string;
  formValue: any;
};
class ResetPassword extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      captchaError: "",
      language: "en",
      formValue: {},
    };
  }

  componentDidMount() {
    this.props.resetValues();
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("captcha error");
  };

  onChange = (value) => {
    console.log("Captcha value:", value);
  };

  customScoreValidator = (value) => {
    this.props.form.setFields({
      score: {
        value,
        errors: [new Error("Invalid input")],
      },
    });
  };
  returnNumber = (number: number) => {
    return number;
  };
  renderRedirect = () => {
    if (this.props.resetStatus.otpValidated) {
      return <Redirect to="/login" />;
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Navbar></Navbar>
        {this.renderRedirect()}

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
          <section className="ts-contact-form" style={{ padding: "30px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h2
                    className="section-title text-center"
                    style={{ marginBottom: "20px" }}
                  >
                    Reset Password
                  </h2>
                </div>
                {/* col end*/}
              </div>

              <Formik
                initialValues={{
                  userId: "",
                }}
                validate={(values) => {
                  const errors: any = {};
                  let requiredFields = [
                    "userId",
                  ];
                  if (!values.userId) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.userId
                    )
                  ) {
                    errors.userId = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.props.resetAction(values);
                  this.setState({
                    formValue: values,
                  });
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: this.props.resetStatus.isResetPassword
                        ? "none"
                        : "contents",
                    }}
                  >
                    <div className="row" style={{justifyContent: 'center'}}>
                      <div className="col-md-12 col-lg-6">
                        <label className="required">Enter your User ID / Email ID</label>
                        <div className="form-group">
                          <input
                            type="email"
                            name="userId"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userId}
                          />
                          <span style={{ color: "red" }}>
                            {errors.userId &&
                              touched.userId &&
                              errors.userId}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <span style={{ color: "red" }}>
                        {this.props.resetStatus.resetErrorMessage}
                      </span>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="register-button"
                        >
                          Get OTP
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
              <Formik
                initialValues={{
                  otp: "",
                  userId: this.state.formValue.userId,
                  sessionId: this.props.resetStatus.otpSessionId,
                  password: "",
                }}
                validate={(values) => {
                  const errors: any = {};
                  let requiredFields = ["otp", "password"];
                  let otpPattern = /^[0-9]{6}$/;
                  if (!otpPattern.test(values.otp)) {
                    errors.otp = "Invalid input";
                  }
                  requiredFields.map((f) => {
                    if (!values[f]) {
                      errors[f] = "Required";
                    }
                  });
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.props.validateOTP({
                    ...values,
                    userId: this.props.resetStatus.userId,
                    sessionId: this.props.resetStatus.data.otpSessionId,
                  });
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: !this.props.resetStatus.isResetPassword
                        ? "none"
                        : "contents",
                    }}
                  >
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-md-12 col-lg-6">
                        <label className="required">Enter OTP</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name="otp"
                            className="form-control"
                            maxLength={this.returnNumber(6)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.otp}
                          />
                          <span style={{ color: "red" }}>
                            {errors.otp && touched.otp && errors.otp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-md-6 col-lg-6">
                        <label className="required">Password</label>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span style={{ color: "red" }}>
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center" }}>
                      <span style={{ color: "red" }}>
                        {this.props.resetStatus.otpErrorMessage}
                      </span>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="register-button"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
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
  resetStatus: state.resetStatus,
});
const mapDispatchToProps = {
  resetAction,
  validateOTP,
  resetValues
};
const resetPasswordForm = Form.create({ name: "ResetPassword" })(ResetPassword);

export default connect(mapStateToProps, {
  resetAction,
  validateOTP,
  resetValues
})(resetPasswordForm);
