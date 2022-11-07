import React from "react";
import { Form, message } from "antd";
import { connect } from "react-redux";
import {
  loginAction,
  logoutAction,
  getMetaData,
} from "../../redux/actions/login/loginAction";
import {Launcher} from 'react-chat-window';
type MyProps = {
  handleClick: any,
  hasOwnProperty: any,
  isOpen: any
};
type MyState = {
  messageList: any,
  isOpen: boolean
};
let publishSocket = null;
let listenSocket = null;

class Event extends React.Component<MyProps, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      messageList: [],
      isOpen: true
    }
    listenSocket.onmessage = (event) => {
      // When receiving a message append a div child to #messages
      let data = JSON.parse(event.data);
      if(data.from !== "Adheep") {
        this.setState({
          messageList: [...this.state.messageList, {
            author: data.from,
            type: 'text',
            data: { text: data.msg }
          }]
        });
      }
    }

    listenSocket.onclose = function(event){
      console.log("Disconnected from server!");
      console.log("Re-Connected to server");
    }

    listenSocket.onopen = function(event){
      console.log("Connected to server");
    }

  }

  _onMessageWasSent(message) {
    let d = new Date();
      var data = {
      from: "Adheep",
      to: "EDU123",
      msg: (message.type==="text"?message.data.text:message.data.emoji),
      timestamp: d.getHours() +":"+ d.getMinutes() + ":" + d.getSeconds()
      };
      // Send the msg object as a JSON-formatted string.
      publishSocket.send(JSON.stringify(data));
      this.setState({
        messageList: [...this.state.messageList, message]
      })
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: 'Chat',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
          isOpen={isOpen}
          handleClick={this.handleClick.bind(this)}
        />
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
