import React, { Component } from "react";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import {initSysCheck} from '../../redux/actions/systemCheck/systemCheckAction'
import ReactStars from "react-rating-stars-component";
import { Input } from 'antd';
import {config} from '../../config/configs'
import axios from "../../utils/leoAxios";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,

  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share'

type MyProps = {
  loginData: any;
  initSysCheck: any;
};
type MyState = {
  feedback: boolean;
  feedbackText: string;
  rating: string
};
const { TextArea } = Input;

class Feedback extends React.Component<MyProps, MyState> {
  constructor(props:any) {
    super(props);
    this.state = {
      feedback: false,
      feedbackText: '',
      rating: ''
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) =>
    {
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });
  }

  submitFeedback = () => {
    this.setState({feedback: true});
    axios.post(config.apiRootPath+config.feedbackUrl,{feedback:this.state.feedbackText,rating:this.state.rating},{headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${sessionStorage.getItem('accessToken')}`
    }}).then(()=>{

    })
  };

  ratingChanged = (newRating) => {
    this.setState({
      rating: newRating
    })
  };

  handleChange = (e) => {
    this.setState({
      feedbackText: e.target.value
    })
  };

  render() {
    return (
      <div className="banner-content-wrap text-center" style={{paddingTop: '75px'}}>
        <div className="row">
          <div className="col-lg-8 col-sm-6 col-md-6 mx-auto" style={{height: '300px'}}>
            {this.state.feedback?(
              <h2 className="section-title1 text-center">
                Thank you for your feedback!
              </h2>
            ):(
              <h2 className="section-title1 text-center">
              Feedback
              <span className="centerStar">
              <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={50}
                activeColor="#ffd700"
              />
              <TextArea
                style={{width: '100%', height: '120px'}}
                value={this.state.feedbackText}
                onChange={this.handleChange}
                rows={4} />
              </span>
              {this.state.feedback?(undefined):(
          <div>
          <Button
            onClick={this.submitFeedback}
            href="#"
            className="btn"
            style={{
              backgroundColor: "#ff007a",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              padding: "15px",
              width: "100px",
            }}
          >
            Submit
          </Button>
          <br></br>
          
          </div>
        )}
            </h2>
            )}
            
          </div>
          {/* col end*/}
          <div className="col-lg-8 col-sm-6 col-md-6 mx-auto">
          <div style={{marginTop: '20px'}} >
          <h2 className="btn--shockwave is-active">Share, Refer and Win!</h2>
          <FacebookShareButton
            className="network__share-button"
            url={"www.eduigi.com"}
            quote={"World's first Open Metaverse platform - NxtLand. Use referal code '"+(this.props.loginData['userDetail']!==undefined?(""+this.props.loginData['userDetail']['referralCode']).toUpperCase():undefined)+"' while registering and get a chance to win exciting gifts!"+
          "HURRY! Only 2 days left #nxtlandclub #metaverse #virtualland @nxtland.io"}
            style={{marginTop: '200px;'}}
            >
              <FacebookIcon
                size={50}
              />
          </FacebookShareButton>

          <WhatsappShareButton
            url={"www.eduigi.com"}
            title={"India's first Virtual Education Expo - Blacksheep's EDUIGI. Use referal code '"+(this.props.loginData['userDetail']!==undefined?(""+this.props.loginData['userDetail']['referralCode']).toUpperCase():undefined)+"' while registering and get a chance to win exciting gifts!"+
            "HURRY! Only 2 days left #Blacksheepeduigi #eduigi #virtualexpo @livfair.event"}
          >
            <WhatsappIcon
                size={50}
              />
          </WhatsappShareButton>

          <TwitterShareButton url={"www.eduigi.com"}
            title={"India's first Virtual Education Expo - Blacksheep's EDUIGI. Use referal code '"+(this.props.loginData['userDetail']!==undefined?(""+this.props.loginData['userDetail']['referralCode']).toUpperCase():undefined)+"' while registering and get a chance to win exciting gifts!"+
            "HURRY! Only 2 days left #Blacksheepeduigi #eduigi #virtualexpo @livfair.event"}>
            <TwitterIcon size={50}></TwitterIcon>
          </TwitterShareButton>

</div>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData
});

const FeedbackForm = Form.create({ name: "SysCheck" })(Feedback);

export default connect(mapStateToProps, {
  initSysCheck
})(FeedbackForm);
