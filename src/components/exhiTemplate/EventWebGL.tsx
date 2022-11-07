import React from "react";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import {
  initSysCheck,
  webglLogout,
} from "../../redux/actions/systemCheck/systemCheckAction";
import Unity, { UnityContent } from "react-unity-webgl";
import EventNavbar from "./EventNavbar";
import { Redirect } from "react-router-dom";
import { Launcher } from "react-chat-window";
import {getChatData} from '../../redux/actions/systemCheck/systemCheckAction'
import axios from "../../utils/leoAxios";

import {config} from '../../config/configs'
type MyProps = {
  loginData: any;
  initSysCheck: any;
  webglLogout: any;
  systemCheck: any;
  metaData: any;
  handleClick: any;
  hasOwnProperty: any;
  isOpen: any;
  getChatData: any;
};
type MyState = {
  webglLoaded: boolean;
  dataSent: boolean;
  showWebgl: boolean;
  progress: any;
  screenObj: any;
  orientationChanged: boolean;
  messageList: any;
  isOpen: boolean;
  chatConnected: boolean;
};

const unityContent = new UnityContent(
  "/Build/public.json",
  "/Build/UnityLoader.js"
);

let userObject = {};
let publishSocket = undefined;
let listenSocket = undefined;
class EventWebGL extends React.Component<MyProps, MyState> {

  private tutorialVideo: React.RefObject<HTMLVideoElement>;

  constructor(props: any) {
    super(props);

    this.tutorialVideo = React.createRef();

    this.state = {
      webglLoaded: false,
      showWebgl: false,
      dataSent: false,
      progress: 0,
      orientationChanged: false,
      screenObj: "",
      messageList: [],
      isOpen: false,
      chatConnected: false
    };
    var dataSent = false;
    /* Listener for WebGL Logout */

    unityContent.on("logout", (score) => {
      this.props.webglLogout();
    });
    userObject = {
      name: this.props.loginData["userDetail"]["name"],
      eventID: "eduigi2020",
      userID: this.props.loginData["emailId"],
      email:this.props.loginData["emailId"],
      gender: "male",
      token: this.props.loginData["token"],
      mobile: this.mobCheck(),
      profileUrl:this.props.loginData["userDetail"]['profileUrl'],
      spawnIndex: this.props.loginData['spawnIndex']?this.props.loginData['spawnIndex']:'0',
      designation: 'Director, Techfully Inc'

    };
    /* Listener for Loaded */
    unityContent.on("loaded_stalls", (score) => {
      this.setState({
        webglLoaded: true,
      });
    });

    /* Listener for Loaded */
    unityContent.on("chatOn", (exhibitorName, exhibitorId) => {
      if(!this.state.chatConnected) {
        this.props.getChatData(this.props.loginData.token, this.startWS);
        this.setState({
          chatConnected: true,
          messageList: [...this.state.messageList, {
            author: "System",
            type: 'text',
            data: { text: "Welcome to our stall "+ this.props.loginData.userDetail.name+", \n\nPlease note our agent will connect with you. If you not got response in One min. Please share your query our team will call you shortly."}
          }]
        });
      }
      this.setState({
        isOpen: true,
      });
    });

    /* Listener for Loading completion on WebGL */
    unityContent.on("progress", (progression) => {
      let walletDetails:string = localStorage.getItem("wallet-"+this.props.loginData["walletAddress"]);
      if(walletDetails && !walletDetails.endsWith("null")) {
        let data = JSON.parse(walletDetails);
        if(data["displayName"]!==undefined) {
          userObject["name"] = data["displayName"];
          userObject["designation"] = data["designation"];
        } else {
          userObject["name"] = this.props.loginData.maskedWalletAddress;  
        }
      } else if (this.props.loginData.walletAddress) {
        userObject["name"] = this.props.loginData.maskedWalletAddress;
      }
      if (progression * 100 === 100) {
        if (true) {
          unityContent.send(
            "BrowserCommunicationManager",
            "login",
            JSON.stringify(userObject)
          );
        }
      } else {
        this.setState({
          progress: progression * 100,
        });
      }
    });
    unityContent.on('brochure_download',(url)=>{
      //console.log(url)
  //       let link = document.createElement('a');
  // link.href = `${url}`;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
      // if(url){
      //   let fileName = url => url.substring(url.lastIndexOf('/') + 1)
      //   try{
      //     downloadFile(url,fileName)
      //   }catch( err){
      //     console.log(err)
      //   }
      // }
    })
    document.addEventListener("fullscreenerror", () => {
    });

  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) =>
    {
        axios.get(config.apiRootPath+config.logoutEvent,{headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${sessionStorage.getItem('accessToken')}`
        }});
        ev.preventDefault();
        //return ev.returnValue = 'Are you sure you want to close?';
    });
  }

  startPublishWS = url => {
    publishSocket = new WebSocket(url + "/messagereceive");
  }

  startWS = (url) => {
    if(!publishSocket) {
      publishSocket = new WebSocket(url + "/messagereceive");
    }
    if(!listenSocket) {
      listenSocket = new WebSocket(url + "/messagepublish");
    }
      listenSocket.onmessage = (event) => {
        // When receiving a message append a div child to #messages
        let data = JSON.parse(event.data);
        if(data.from !== this.props.loginData.userDetail.name) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: data.from,
              type: 'text',
              data: { text: data.from+":\n\n"+data.msg }
            }]
          });
        }
      }

      listenSocket.onclose = (event) => {
        console.log("Disconnected from server!");
        if(this.state.isOpen) {
          this.setState({
            chatConnected: true
          });
          listenSocket = undefined;
          this.startWS(this.props.systemCheck.chatUrl+this.props.systemCheck.exhibitorId);
          console.log("Re-Connected to server");
        }
      }

      listenSocket.onopen = function(event){
        console.log("Connected to server");
      }

      publishSocket.onclose = (event) => {
        console.log("Publish - Disconnected from server!");
        if(this.state.isOpen) {
          this.setState({
            chatConnected: true
          });
          publishSocket = undefined;
          this.startWS(this.props.systemCheck.chatUrl+this.props.systemCheck.exhibitorId);
          console.log("Publish - Re-Connected to server");
        }
      }
  }

  loadData = () => {

    //this.tutorialVideo.current.pause();
    axios.post(config.apiRootPath+config.loginEvent,{mobile:this.mobCheck()},{headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${sessionStorage.getItem('accessToken')}`
    }});
    this.setState({
      showWebgl: true,
    });
    let canvas = document.getElementsByTagName('canvas')[0]
    canvas.height = 945;
canvas.style.width  = '100%';
canvas.style.height = '100%';
  };
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
  renderRedirect = () => {
    if (this.props.systemCheck["webglLogout"]) {
      return <Redirect to="/feedback" />;
    }
  };

  eventRedirect = () => {
    if (!this.props.systemCheck.isValidated) {
      return <Redirect to="/event" />;
    }
  };
  requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  };
  orientationCheck = () => {
    let fullscreenEnabled = document.fullscreenEnabled;
    if (this.mobCheck() && !this.state.orientationChanged) {
      this.requestFullscreen(document.documentElement);
      //screen.orientation.lock("landscape");
      this.setState({ orientationChanged: true });
    }
   // this.requestFullscreen(document.documentElement);
  };

  _onMessageWasSent(message) {
    let d = new Date();
      var data = {
      from: this.props.loginData.userDetail.name,
      to: this.props.systemCheck.exhibitorId,
      msg: (message.type==="text"?message.data.text:message.data.emoji),
      timestamp: d.getHours() +":"+ d.getMinutes() + ":" + d.getSeconds()
      };
      if(publishSocket) {
        // Send the msg object as a JSON-formatted string.
        publishSocket.send(JSON.stringify(data));
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      } else {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      unityContent.send(
        "BrowserCommunicationManager",
        "chatOff",
        JSON.stringify(userObject)
      );
      this.setState({
        isOpen: !this.state.isOpen,
        messageList: [],
        chatConnected: false
      });
      publishSocket = undefined;
      listenSocket = undefined;
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty("isOpen")
      ? this.props.isOpen
      : this.state.isOpen;
    return (
      <div>
        {this.orientationCheck()}
        {this.renderRedirect()}
        {this.eventRedirect()}
        <div style={{zIndex: 99999}}>
          <Launcher
            agentProfile={{
              teamName: this.props.systemCheck.exhibitorName,
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
            isOpen={isOpen}
            handleClick={this.handleClick.bind(this)}
          />
        </div>
        <div>
          <div>
            <div
              style={{
                display: this.state.showWebgl ? "none" : "",
                maxWidth: "100%",
              }}
              className="container"
            >
              <EventNavbar></EventNavbar>
              <br></br>
              <br></br>
              <br></br>
              <div className="row">
                {/* <div className="col-lg-8 col-sm-9">
                  <video ref={this.tutorialVideo} width="100%" autoPlay loop>
                    <source src="/tutorial.mp4" type="video/mp4" />
                  </video>
                </div> */}
                <div className="col-lg-12 col-sm-12 mx-auto text-center">
                  <div
                    className="col-lg-12 col-sm-12"
                    style={{
                      display: this.state.webglLoaded ? "none" : "",
                    }}
                  >
                    <h2 className="section-title1 text-center" style={{fontSize: '4vw'}}>
                      <img
                        alt="3"
                        src="./images/loading.gif"
                        style={{ height: "10vw" }}
                      />
                      <br></br>
                      {parseInt(this.state.progress)}% Loading...
                      <span style={{ marginTop: "20px", fontSize: '1vw' }}>
                        Please be patient! It might take few minutes depending on your network speed. We are getting
                        everything ready for your virtual experience!
                      </span>
                    </h2>
                  </div>
                  <div
                    className="col-lg-6 col-sm-12 col-md-6 mx-auto"
                    style={{
                      display: this.state.webglLoaded ? "" : "none",
                      paddingTop: "80px",
                    }}
                  >
                    <h2 className="text-center">
                      <Button
                        onClick={this.loadData}
                        href="#"
                        className="btn"
                        style={{
                          backgroundImage:
                            "url('" + "/images/start_btn.png" + "')",
                          backgroundSize: "130px 130px",
                          backgroundRepeat: "no-repeat",
                          color: "white",
                          fontSize: "16px",
                          fontWeight: 700,
                          paddingTop: "15%",
                          width: "130px",
                          height: "130px",
                          borderRadius: "50%",
                        }}
                      ></Button>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: this.state.showWebgl ? "" : "none" }}>
              <Unity unityContent={unityContent}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  systemCheck: state.systemCheck,
  metaData: state.metaData,
});

const EventWebGLForm = Form.create({ name: "SysCheck" })(EventWebGL);

export default connect(mapStateToProps, {
  initSysCheck,
  webglLogout, getChatData
})(EventWebGLForm);
