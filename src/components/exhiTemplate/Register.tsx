import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import {
  registerAction,
  validateOTP,
} from "../../redux/actions/register/registerAction";
import FileBase64 from "react-file-base64";
import { connect } from "react-redux";
import Navbar from "./Navbar";

import {
  Row,
  Input,
  Form,
  Button,
  Layout,
  Alert,
  Select,
  InputNumber,
} from "antd";
const { Option } = Select;


const recaptchaRef = React.createRef();
type MyProps = {
  inmemoryLanguage: any;
  registerAction: any;
  registerStatus: any;
  validateOTP: any;
  form: any;
};
type MyState = {
  captchaError: string;
  language: string;
  formValue: any;
  file: any;
  fileError: any;
};
class Register extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      captchaError: "",
      language: "en",
      formValue: {},
      file: {},
      fileError: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("captcha error");
  };

  onChange = (value) => {
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
    if (this.props.registerStatus.otpValidated) {
      //return <Redirect to="/" />;
    }
  };
  checkFileUpload() {
    let { file } = this.state;
    if (file !== undefined && file !== null) {
      return true;
    } else {
      return false;
    }
  }
  getFiles(files) {
    let { size } = files;
    if (parseInt(size.replace("kB", "")) > 500) {
      this.setState({ fileError: `File size cannot exceed 500 KB` });
    } else {
      this.setState({ file: files, fileError: "" });
    }
  }
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
          <section
            className="ts-contact-form"
            style={{
              padding: "30px",
              backgroundImage: "url(images/hero_area/speaker_bg.jpg)",
              display: this.props.registerStatus.otpValidated
                ? "none"
                : "contents",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h2
                    className="section-title text-center"
                    style={{ marginBottom: "20px" }}
                  >
                    Register for the Event
                  </h2>
                </div>
                {/* col end*/}
              </div>

              <Formik
                initialValues={{
                  name: "",
                  gender: "female",
                  parentName: "",
                  emailId: "",
                  password: "",
                  mobileNumber: "",
                  confirmPassword: "",
                  board: "STATEBOARD",
                  score: "",
                  cutOff: "",
                  scholarshipEligibility: "none",
                  desiredCourse: "engineering",
                  decidedCourse: "no",
                  decidedCollege: "no",
                  needScholarship: "no",
                  fatherIncome: "",
                  purposeOfVisit: "",
                  studentName: "",
                  visitorType: "others",
                  userType: "Visitor",
                  eventName: "Edu Fair 2020",
                  roleName: "Visitor",
                  referredCode: "",
                }}
                validate={(values) => {
                  const errors: any = {};
                  let requiredFields = [];
                  if (values.visitorType == "others") {
                    requiredFields = [
                      "name",
                      "password",
                      "confirmPassword",
                      "mobileNumber",
                      "emailId",
                      "gender",
                    ];
                  } else {
                    requiredFields = [
                      "name",
                      "password",
                      "gender",
                      "confirmPassword",
                      "mobileNumber",
                      "emailId",
                      "desiredCourse",
                    ];
                  }

                  if (!values.emailId) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.emailId
                    )
                  ) {
                    errors.emailId = "Invalid email address";
                  }
                  let mobileNumberPattern = /^[0-9]{10}$/;
                  let scorePattern = /^[0-9]$/;
                  // //let cutOffPattern = /^[0-9]$/;
                  if (parseInt(values.score) > 1200) {
                    errors.score = "Score cannot be more than 1200";
                  } else if (parseInt(values.score) < 1) {
                    errors.score = "Score cannot be less than 1";
                  }
                  if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Password mismatch";
                  }
                  if (!mobileNumberPattern.test(values.mobileNumber)) {
                    errors.mobileNumber = "Enter a valid mobile number";
                  }

                  // if (parseInt(values.cutOff) > 200) {
                  //   errors.cutOff = "CutOff cannot be more than 200";
                  // } else if (parseInt(values.cutOff) < 1) {
                  //   errors.cutOff = "CutOff cannot be less than 1";
                  // }
                  requiredFields.map((f) => {
                    if (!values[f]) {
                      errors[f] = "Required";
                    }
                  });
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  let { file } = this.state;
                  let { base64 } = file;
                  let resultString = base64.split(",")[1];
                  this.props.registerAction({
                    ...values,
                    profileUrl: resultString,
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
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display:
                        this.props.registerStatus.isRegistered &&
                        !this.props.registerStatus.otpValidated
                          ? "none"
                          : "contents",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label className="required">Full Name</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />
                          <span style={{ color: "red" }}>
                            {errors.name && touched.name && errors.name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="required">Visitor Type</label>
                        <div className="form-group">
                          <select
                            name="visitorType"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.visitorType}
                          >
                            <option value="others" label="Others" />
                          </select>
                          <span style={{ color: "red" }}>
                            {errors.visitorType &&
                              touched.visitorType &&
                              errors.visitorType}
                          </span>
                        </div>
                      </div>
                      {values.visitorType == "parent" ? (
                        <div className="col-md-6">
                          <label className="required">Student Name </label>
                          <div className="form-group">
                            <input
                              type="text"
                              name="studentName"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.studentName}
                            />
                            <span style={{ color: "red" }}>
                              {errors.studentName &&
                                touched.studentName &&
                                errors.studentName}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span />
                      )}
                      {values.visitorType == "others" ? (
                        <div className="col-md-6">
                          <label>Purpose of Visit </label>
                          <div className="form-group">
                            <input
                              type="text"
                              name="purposeOfVisit"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.purposeOfVisit}
                            />
                            <span style={{ color: "red" }}>
                              {errors.purposeOfVisit &&
                                touched.purposeOfVisit &&
                                errors.purposeOfVisit}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span />
                      )}
                      <div className="col-md-6">
                        <label className="required">Gender</label>
                        <div className="form-group">
                          <select
                            name="gender"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                          >
                            <option value="male" label="Male" />
                            <option value="female" label="Female" />
                          </select>
                          <span style={{ color: "red" }}>
                            {errors.gender && touched.gender && errors.gender}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="required">Email</label>
                        <div className="form-group">
                          <input
                            type="email"
                            name="emailId"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.emailId}
                          />
                          <span style={{ color: "red" }}>
                            {errors.emailId &&
                              touched.emailId &&
                              errors.emailId}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="required">Mobile Number</label>
                        <div className="form-group">
                          <input
                            type="tel"
                            name="mobileNumber"
                            onChange={handleChange}
                            className="form-control"
                            onBlur={handleBlur}
                            maxLength={this.returnNumber(10)}
                            value={values.mobileNumber}
                            pattern="[0-9]{10}"
                          />
                          <span style={{ color: "red" }}>
                            {errors.mobileNumber &&
                              touched.mobileNumber &&
                              errors.mobileNumber}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-md-6">
                        <label className="required">Confirm Password</label>
                        <div className="form-group">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                          />
                          <span style={{ color: "red" }}>
                            {errors.confirmPassword &&
                              touched.confirmPassword &&
                              errors.confirmPassword}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label>Referral Code (Optional)</label>
                        <div className="form-group">
                          <input
                            type="password"
                            name="referredCode"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.referredCode}
                          />
                          <span style={{ color: "red" }}>
                            {errors.referredCode &&
                              touched.referredCode &&
                              errors.referredCode}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label>Please upload your picture</label>
                        <div className="form-group">
                          <FileBase64
                            multiple={false}
                            onDone={this.getFiles.bind(this)}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.fileError}
                          </span>
                        </div>
                      </div>

                      {values.visitorType !== "others" ? (
                        <div className="col-md-6">
                          <label className="required">
                            Board of Examination
                          </label>
                          <div className="form-group">
                            <select
                              name="board"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.board}
                            >
                              <option value="stateboard" label="STATEBOARD" />
                              <option value="cbse" label="CBSE" />
                            </select>
                            <span style={{ color: "red" }}>
                              {errors.board && touched.board && errors.board}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {values.visitorType !== "others" ? (
                        <div className="col-md-6">
                          <label className="required">Your marks</label>
                          <div className="form-group">
                            <input
                              type="text"
                              name="score"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={this.returnNumber(4)}
                              value={values.score}
                              pattern="[0-9]+"
                            />
                            <span style={{ color: "red" }}>
                              {errors.score && touched.score && errors.score}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {values.visitorType !== "others" ? (
                        <div className="col-md-6">
                          <label className="required">Desired Course</label>
                          <div className="form-group">
                            <select
                              name="desiredCourse"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.desiredCourse}
                            >
                              <option value="engineering" label="Engineering" />
                              <option value="arts" label="Arts and Science" />
                              <option
                                value="engg-arts"
                                label="Engineering & Arts and Science"
                              />
                              <option value="others" label="Other" />
                            </select>
                            <span style={{ color: "red" }}>
                              {errors.desiredCourse &&
                                touched.desiredCourse &&
                                errors.desiredCourse}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    
                    </div>
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          src={this.state.file.base64}
                          style={{ width: "20%", marginBottom: "8px" }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting && this.checkFileUpload()}
                          style={{
                            backgroundColor: "#ff007a",
                            border: "0px",
                            color: "white",
                            fontSize: "16px",
                            width: "300px",
                            height: "40px",
                            fontWeight: 700,
                          }}
                        >
                          Get OTP
                        </button>
                      </div>
                    </div>

                    {this.props.registerStatus.registrationErrorMessage !==
                      "" ||
                    this.props.registerStatus.registrationErrorMessage !==
                      undefined ? (
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{ textAlign: "center" }}
                        >
                          <span
                            style={{ color: "red" }}
                          >{`${this.props.registerStatus.registrationErrorMessage}`}</span>
                        </div>
                      </div>
                    ) : (
                      <span />
                    )}
                  </form>
                )}
              </Formik>
              <Formik
                initialValues={{
                  otp: "",
                  userId: this.state.formValue.emailId,
                  sessionId: this.props.registerStatus.otpSessionId,
                }}
                validate={(values) => {
                  const errors: any = {};
                  let requiredFields = ["otp"];
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
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  this.props.validateOTP({
                    ...values,
                    userId: this.props.registerStatus.emailId || "",
                    sessionId:
                      this.props.registerStatus.data.otpSessionId || "",
                  });
                  setSubmitting(false);
                  this.setState({ formValue: values });
                  //resetForm({})
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,
                  isSubmitting = false,
                  /* and other goodies */
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display:
                        !this.props.registerStatus.isRegistered &&
                        !this.props.registerStatus.otpValidated
                          ? "none"
                          : "contents",
                    }}
                  >
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
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
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <button type="submit" className="register-button">
                          Submit
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <span style={{ color: "red" }}>{`${
                          this.props.registerStatus.otpValidationMessage || ""
                        }`}</span>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </section>
          <section>
            {this.props.registerStatus.otpValidated ? (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h4>
                      Thanks for registering !!! You can login with the email
                      and password you registered with on Event Date ( 24,25,26
                      August 2020)
                    </h4>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  metaData: state.metaData,
  registerStatus: state.registration,
});
const mapDispatchToProps = {
  registerAction,
};
const registerUserForm = Form.create({ name: "Register" })(Register);

export default connect(mapStateToProps, {
  registerAction,
  validateOTP,
})(registerUserForm);
