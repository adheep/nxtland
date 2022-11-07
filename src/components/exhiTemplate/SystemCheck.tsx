import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button } from "antd";
import { completeSysCheck } from "../../redux/actions/login/loginAction";

type MyProps = {
  inmemoryLanguage: any;
  logoutAction: any;
  completeSysCheck: any;
  getMetaData: any;
  loginData: any;
  metaData: any;
  form: any;
};
type MyState = {
  captchaError: string;
  language: string;
  systemData: any;
  os: string;
  browser: string;
  browserMessage: string;
  webgl: boolean;
  bandwidth: boolean;
  osValue: string;
  browserValue: string;
  webglValue: string;
  bandwidthValue: string;
  osMessage: string;
  mobile:boolean;
};

let browserInfo = require("browser-info");

class SystemCheck extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      captchaError: "",
      language: "en",
      os: "false",
      osMessage: "",
      browser: "false",
      browserMessage: "",
      mobile:this.mobCheck(),
      webgl: false,
      bandwidth: false,
      systemData: {},
      osValue: "",
      browserValue: "",
      webglValue: "",
      bandwidthValue: "",
    };
  }
  mobCheck = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  };
  componentWillMount() {
    let data = browserInfo();
    this.setState({
      systemData: {
        ...this.state.systemData,
        ...data,
      },
    });
  }

  componentDidMount() {
    let winNew  = ["Windows 10","Windows 7","Windows 8","Windows","Linux","iOS","OS X","Android"];
    if (winNew.includes(this.state.systemData['os'])){
      setTimeout(() => {
        this.setState({
          os: "true",
        });
      }, 2000);
     } else {
      setTimeout(() => {
        this.setState({
          os: "error",
          osMessage: "Your OS version is not supported. Please run it from a different machine"
        });
      }, 2000);
     }
    if ((this.state.systemData["name"] === "Chrome" && parseInt(this.state.systemData["version"])> 60) ||
        (this.state.systemData["name"] === "Firefox" && parseInt(this.state.systemData["version"])> 50) ||
        (this.state.systemData["name"] === "Safari" && parseInt(this.state.systemData["version"])> 11) ||
        (this.state.systemData["name"] === "Edge" && parseInt(this.state.systemData["version"])> 15)) {
          setTimeout(() => {
            this.setState({
              browser: "true",
            });
          }, 4000);
    } else {
      setTimeout(() => {
        this.setState({
          browser: "error",
          browserMessage: "Your browser is not supported. Try latest version of Chrome, Firefox or Edge"
        });
      }, 4000);
    }
    if (this.state.systemData["os"] !== "") {
      setTimeout(() => {
        this.setState({
          webgl: true,
          webglValue: "Supported",
        });
      }, 2000);
    }
    if (this.state.systemData["os"] !== "") {
      setTimeout(() => {
        this.setState({
          bandwidth: true,
          bandwidthValue: "> 2Mbps",
        });
      }, 2000);
    }
  }

  checkComplete = () => {
    this.props.completeSysCheck(this.state);
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="tab-content schedule-tabs">
            <br></br>
            <div
              role="tabpanel"
              className="tab-pane active"
              id="date3"
              style={{ backgroundColor: "white" }}
            >
              <div className="schedule-listing">
                <div
                  className="schedule-slot-info"
                  style={{ padding: "12px 20px 12px 140px" }}
                >
                  {this.state.os==="error"?(
                    <a href="#">
                      <img
                        className="systemcheck"
                        src="images/error.png"
                        alt=""
                        style={{height: '4vw', width: '4vw'}}
                      />
                    </a>
                  ):(
                    <a href="#">
                      <img
                        className="systemcheck"
                        src={
                          this.state.os ? "images/tick.png" : "images/spinner.gif"
                        }
                        alt=""
                        style={{height: '4vw', width: '4vw'}}
                      />
                    </a>
                  )}
                  <div className="schedule-slot-info-content">
                    <h3 className="schedule-slot-title">
                      Operating System Check
                      {!this.state.os ? (
                        <img
                          src="images/dots.gif"
                          style={{ width: "50px" }}
                          alt=""
                        />
                      ) : (
                        <strong>( {this.state.systemData.os} )</strong>
                      )}
                    </h3>
                    <p>
                      {(this.state.os) === "error"?(
                        this.state.osMessage
                      ):(
                        this.state.mobile?"":
                        "Verifying Operating System is essential because certain OS\
                        and version doesn't support high end graphics rendering.\
                        This might cause some slowness in the user experience"
                      )}
                    </p>
                  </div>
                  {/*Info content end */}
                </div>
                {/* Slot info end */}
              </div>
              {/*schedule-listing end */}
              <div className="schedule-listing">
                <div
                  className="schedule-slot-info"
                  style={{ padding: "12px 20px 12px 140px" }}
                >
                  {this.state.browser==="error"?(
                    <a href="#">
                      <img
                        className="systemcheck"
                        src="images/error.png"
                        alt=""
                        style={{height: '4vw', width: '4vw'}}
                      />
                    </a>
                  ):(
                    <a href="#">
                      <img
                        className="systemcheck"
                        src={
                          this.state.browser ? "images/tick.png" : "images/spinner.gif"
                        }
                        alt=""
                        style={{height: '4vw', width: '4vw'}}
                      />
                    </a>
                  )}
                  <div className="schedule-slot-info-content">
                    <h3 className="schedule-slot-title">
                      Browser Check
                      {!this.state.browser ? (
                        <img
                          src="images/dots.gif"
                          style={{ width: "50px" }}
                          alt=""
                        />
                      ) : (
                        <strong>
                          ( {this.state.systemData.name}{" "}
                          {this.state.systemData.version} )
                        </strong>
                      )}
                    </h3>
                    <p>
                      {this.state.browser === "error"?(
                          this.state.browserMessage
                        ):(
                        this.state.mobile?"":
                        "Certain old browsers do not support loading 3D models and\
                        rendering. Hence browser validation is essential for an\
                        unhindered user experience"
                        )}
                    </p>
                  </div>
                  {/*Info content end */}
                </div>
                {/* Slot info end */}
              </div>
              {/*schedule-listing end */}
              <div className="schedule-listing">
                <div
                  className="schedule-slot-info"
                  style={{ padding: "12px 20px 12px 140px" }}
                >
                  <a href="#">
                    <img
                      className="systemcheck"
                      src={
                        this.state.webgl
                          ? "images/tick.png"
                          : "images/spinner.gif"
                      }
                      alt=""
                      style={{height: '4vw', width: '4vw'}}
                    />
                  </a>
                  <div className="schedule-slot-info-content">
                    <h3 className="schedule-slot-title">
                      3D and Graphics Check
                      {!this.state.webgl ? (
                        <img
                          src="images/dots.gif"
                          style={{ width: "50px" }}
                          alt=""
                        />
                      ) : (
                        <strong>( {this.state.webglValue} )</strong>
                      )}
                    </h3>
                    {this.state.mobile?undefined:(
                      <p>
                        Ensuring any graphics settings has been disabled or
                        unavailable. This is very crucial for smooth rendering and
                        navigation within the Expo
                      </p>
                    )}
                  </div>
                  {/*Info content end */}
                </div>
                {/* Slot info end */}
              </div>
              {/*schedule-listing end */}
              <div className="schedule-listing">
                <div
                  className="schedule-slot-info"
                  style={{ padding: "12px 20px 12px 140px" }}
                >
                  <a href="#">
                    <img
                      className="systemcheck"
                      src={
                        this.state.bandwidth
                          ? "images/tick.png"
                          : "images/spinner.gif"
                      }
                      alt=""
                      style={{height: '4vw', width: '4vw'}}
                    />
                  </a>
                  <div className="schedule-slot-info-content">
                    <h3 className="schedule-slot-title">
                      Bandwidth
                      {!this.state.bandwidth ? (
                        <img
                          src="images/dots.gif"
                          style={{ width: "50px" }}
                          alt=""
                        />
                      ) : (
                        <strong>( {this.state.bandwidthValue} )</strong>
                      )}
                    </h3>
                    {this.state.mobile?undefined:(
                      <p>
                      Make sure you have atleast 2Mbps of network speed. The
                      event might take longer time to load on a lower bandwidth,
                      so be patient
                    </p>
                    )}
                  </div>
                  {/*Info content end */}
                </div>
                {/* Slot info end */}
              </div>
              {/*schedule-listing end */}
            </div>
          </div>
        </div>
        {(this.state.bandwidth && (this.state.os!=='error' && this.state.browser!=='error'))?(
        <div className="banner-content-wrap text-center" style={{width: '100%', padding: '30px'}}>
          <Button
            onClick={this.checkComplete}
            href="#"
            className="btn"
            style={{
              backgroundColor: "#ff007a",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              padding: "15px",
              width: "150px",
            }}
          >Continue
          </Button>
        </div>):undefined}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  metaData: state.metaData,
});

const LoginuserForm = Form.create({ name: "Login" })(SystemCheck);

export default connect(mapStateToProps, { completeSysCheck })(LoginuserForm);
