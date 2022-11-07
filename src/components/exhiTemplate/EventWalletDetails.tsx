import React, { Component } from "react";
import { Input, Form, Button } from "antd";
import { connect } from "react-redux";
import { initSysCheck } from "../../redux/actions/systemCheck/systemCheckAction";
import SystemCheck from "./SystemCheck";
import Calibaration from "./Calibaration";
import { setWalletDetails } from "../../redux/actions/login/loginAction";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "./EventWalletDetails.css";
import emptyToken from "./NLC_Empty.jpg"

type MyProps = {
  loginData: any;
  initSysCheck: any;
  systemCheck: any;
  setWalletDetails: any;
  form: any;
};
type MyState = {
  systemCheck: boolean;
  displayName: string;
  companyName: string;
  designation: string;
  showAvatarSelection: boolean;
  tokens: Array<string>;
  getToken: boolean;
  selectedToken: string;
  spawnIndex: string;
  isPolygon: boolean;
};

class EventWalletDetails extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    let data = {};
    let walletDetails: string = localStorage.getItem(
      "wallet-" + this.props.loginData["walletAddress"]
    );
    if (walletDetails && !walletDetails.endsWith("null")) {
      data = JSON.parse(walletDetails);
    }

    let chainName = localStorage.getItem('chainName');
    let isPolygon = chainName.includes("Mumbai");
    this.state = {
      displayName: data["displayName"],
      companyName: data["companyName"],
      designation: data["designation"],
      systemCheck: false,
      showAvatarSelection: false,
      tokens: undefined,
      getToken: true,
      selectedToken: undefined,
      spawnIndex: undefined,
      isPolygon
    };
  }

  systemCheck = () => {
    this.props.initSysCheck();
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values = {
          ...this.state,
        };
        values["walletAddress"] = this.props.loginData.walletAddress;
        //values["savedWalletDetails"] = true;
        this.setState({showAvatarSelection: true});
        let walletAddress = this.props.loginData.walletAddress;
        let firstPart = walletAddress.substring(0, 5);
        let lastPart = walletAddress.substring(
          walletAddress.length - 5,
          walletAddress.length
        );
        values["maskedWalletAddress"] = firstPart + "..." + lastPart;
        localStorage.setItem(
          "wallet-" + this.props.loginData.walletAddress,
          JSON.stringify(values)
        );
        this.props.setWalletDetails(values);
        this.getTokens();
      } else {
      }
    });
  };

  handleTokenSelect = (tokenId) => {
    let chainName = localStorage.getItem("chainName");

    if(chainName.includes("Ethereum")) {
      if(tokenId=='63054725577156053341048092405222664900733819093131058101971022255879782137956') {
        this.props.setWalletDetails({
          selectedToken: tokenId,
          spawnIndex: "2",
          savedWalletDetails: true
        });
      } else if (tokenId=='63054725577156053341048092405222664900733819093131058101971022258078805393908') {
        this.props.setWalletDetails({
          selectedToken: tokenId,
          spawnIndex: "1",
          savedWalletDetails: true
        });
      } else if (tokenId=='63054725577156053341048092405222664900733819093131058101971022256979293766632') {
        this.props.setWalletDetails({
          selectedToken: tokenId,
          spawnIndex: "0",
          savedWalletDetails: true
        });
      }
    } else if(chainName.includes("Polygon")) {
      if(tokenId=='63054725577156053341048092405222664900733819093131058101971022255879782138356') {
        this.props.setWalletDetails({
          selectedToken: tokenId,
          spawnIndex: "2",
          savedWalletDetails: true
        });
      } else if (tokenId=='63054725577156053341048092405222664900733819093131058101971022254780270510580') {
        this.props.setWalletDetails({
          selectedToken: tokenId,
          spawnIndex: "1",
          savedWalletDetails: true
        });
      } else if (tokenId=='63054725577156053341048092405222664900733819093131058101971022253680758882305') {
        this.props.setWalletDetails({
          selectedToken: tokenId,
          spawnIndex: "0",
          savedWalletDetails: true
        });
      }
    }

  }

  handleDisplayChange = (e) => {
    this.setState({
      displayName: e.target.value,
    });
  };

  handleCompanyChange = (e) => {
    this.setState({
      companyName: e.target.value,
    });
  };

  handleDesignationChange = (e) => {
    this.setState({
      designation: e.target.value,
    });
  };

  createTokenElement = ({ name, collection, description, permalink, image_preview_url, token_id }) => {
    const newElement = {
      section: `${collection.slug}_${token_id}`,
      name,
      a: permalink,
      img_url: image_preview_url,
      description,
      id: token_id
    };
  
    return newElement
  }

  setTokens = (data) => {
    console.log(14, data);
    let tokens = this.state.tokens;
    if(tokens===undefined) {
      tokens = [];
    }
    tokens.push(data);
    console.log(15, tokens);
    this.setState({tokens: tokens, getToken:false});
  }

  getTokens = () => {
    console.log(9, this.state.getToken);
    if(this.state.getToken) {
      let tok = undefined;
      let ownerAddress=this.props.loginData["walletAddress1"];
      let chainName = localStorage.getItem("chainName1");
      console.log(8, chainName, !chainName && chainName.includes("Ethereum"), chainName, chainName.includes("Ethereum"));
      if(chainName.includes("Ethereum")) {
        console.log(10);
        fetch(
          `https://testnets-api.opensea.io/api/v1/assets?owner=${ownerAddress}&order_direction=desc&offset=0&limit=30`,
          { method: "GET", headers: { Accept: "application/json" } }
        ).then(response => response.json()).then(({ assets }) => {
          assets.forEach((attributes) => {
            if(tok===undefined) {
              tok = [];
            }
            
            console.log(11, attributes);
            
            if(attributes['token_id']=='63054725577156053341048092405222664900733819093131058101971022258078805393908'
            ||attributes['token_id']=='63054725577156053341048092405222664900733819093131058101971022256979293766632'
            ||attributes['token_id']=='63054725577156053341048092405222664900733819093131058101971022255879782137956') {
              tok.push((this.createTokenElement(attributes)));   
            }
  
            // if(chainName.includes("Polygon")) {
            //   if(attributes['token_id']=='63054725577156053341048092405222664900733819093131058101971022255879782138356'
            //   ||attributes['token_id']=='63054725577156053341048092405222664900733819093131058101971022254780270510580'
            //   ||attributes['token_id']=='63054725577156053341048092405222664900733819093131058101971022253680758882305') {
            //     tok.push((this.createTokenElement(attributes)));   
            //   }
            // }
          });
          this.setState({tokens: tok, getToken:false});
        }).catch(err =>{
        });
      } else if(chainName.includes("Polygon")) {
        const url = `https://deep-index.moralis.io/api/v2/${ownerAddress}/nft?chain=mumbai&format=decimal`
        const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'Your_key'}};

        fetch(url, options)
          .then(res => res.json())
          .then(json => {
            console.log(json);
            if(json['result'][0]) {
              let resultCount = json['result'].length;
              let i=0;
              {
                console.log(10, json['result'][i]);
                let tokenId = json['result'][i]['token_id'];
                let tokenUri = json['result'][i]['token_uri'];
                console.log(11, tokenId, tokenUri);

                fetch(
                  tokenUri,
                  { method: "GET", headers: { Accept: "application/json" } }
                ).then(response => response.json()).then(resp => {
                  if(tok===undefined) {
                    tok = [];
                  }

                  console.log(12, resp);

                  let data = {
                    name : resp['name'],
                    img_url: resp['image'],
                    description: resp['description'],
                    id: tokenId
                  }
                  this.setTokens(data);
                });
                i++;
              }
            }

          })
          .catch(err => console.error('error:' + err));
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //this.getTokens();
    return (
      <div
        className="banner-item"
        style={{
          backgroundImage: "url(images/speakers/speaker_bg.png)",
        }}
      >
        <div className="speaker-shap">
          <img
            className="shap1"
            src="images/shap/home_speaker_memphis1.png"
            alt=""
          />
          <img
            className="shap2"
            src="images/shap/home_speaker_memphis2.png"
            alt=""
          />
        </div>
        {!this.state.showAvatarSelection?(<div><div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="section-title text-center" style={{marginTop:'25px', marginBottom:'45px'}}>
              Profile Details (Optional)
            </h2>
          </div>
          {/* col end*/}
        </div>
        <div className="container">
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
                      {getFieldDecorator("displayName", {
                        rules: [
                          {
                            message: "Please enter your display name",
                            required: false,
                          },
                          {
                            max: 100,
                            message:
                              "Display name should be accept maximum 35 characters",
                          },
                          {
                            message:
                              "Display name should be minimum 4 characters",
                            min: 4,
                          },
                        ],
                      })(
                        <div className="row">
                          <div className="col-md-6 mx-auto">
                            <div
                              className="form-group"
                              style={{ marginBottom: "6px" }}
                            >
                              <Input
                                className="form-control form-control-email"
                                placeholder="Display Name"
                                name="displayName"
                                id="displayName"
                                type="displayName"
                                value={this.state.displayName}
                                onChange={this.handleDisplayChange}
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
                      {getFieldDecorator("companyName", {
                        rules: [
                          {
                            message: "Please enter your company name",
                            required: false,
                          },
                          {
                            max: 100,
                            message:
                              "Company name should be accept maximum 35 characters",
                          },
                          {
                            message:
                              "Company name should be minimum 4 characters",
                            min: 4,
                          },
                        ],
                      })(
                        <div className="row">
                          <div className="col-md-6 mx-auto">
                            <div
                              className="form-group"
                              style={{ marginBottom: "6px" }}
                            >
                              <Input
                                className="form-control form-control-email"
                                placeholder="Company Name"
                                name="companyName"
                                id="companyName"
                                type="companyName"
                                value={this.state.companyName}
                                onChange={this.handleCompanyChange}
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
                      {getFieldDecorator("designation", {
                        rules: [
                          {
                            message: "Please enter your designation",
                            required: false,
                          },
                          {
                            max: 100,
                            message:
                              "Designation should be accept maximum 35 characters",
                          },
                          {
                            message:
                              "Designation should be minimum 4 characters",
                            min: 4,
                          },
                        ],
                      })(
                        <div className="row">
                          <div className="col-md-6 mx-auto">
                            <div
                              className="form-group"
                              style={{ marginBottom: "6px" }}
                            >
                              <Input
                                className="form-control form-control-email"
                                placeholder="Designation"
                                name="designation"
                                id="designation"
                                type="designation"
                                value={this.state.designation}
                                onChange={this.handleDesignationChange}
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
                    Save &amp; Continue
                  </Button>
                </div>
                <br></br>
              </Form>
            </div>
          </div>
        </div>
        </div>):undefined}
        {this.state.showAvatarSelection? (<div>
          <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="section-title text-center" style={{marginTop:'25px', marginBottom:'45px'}}>
              Choose your Avatar (Your NLC NFTs should list here)
            </h2>
            <p>
            {this.state.tokens?(this.state.isPolygon?(<div style={{color:'#000', zIndex: 9999, marginLeft: '15%'}}>Checkout the latest collection of NFT from NxtLandClub (NLC) in <a href="https://testnets.opensea.io/collection/nlc-polygon" target="_blank">OpenSea</a></div>):
            (<div style={{color:'#000', zIndex: 9999, marginLeft: '15%'}}>Checkout the latest collection of NFT from NxtLandClub (NLC) in <a href="https://testnets.opensea.io/collection/nxtlandclubv2" target="_blank">OpenSea</a></div>)):undefined}
            </p>
          </div>
        </div>
          <div className="App">
            {this.state.tokens?(this.state.tokens).map(token => (
              <Card className="Card-new">
              <CardActionArea>
                <CardMedia
                  style={{ height: 260 }}
                  image={token['img_url']}
                  title="cardcontent"
                />
                <CardContent style={{ padding: 0 }}>
                  <p className="card-header1">{token['name']}</p>
                  <p
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      color: "#7C7887",
                      fontSize: "15px",
                    }}
                  >
                    {token['description']}
                  </p>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  paddingTop: "2%",
                }}
              >
                <button className="button2"
                      style={{
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 500,
                        backgroundColor: "#d20055",
                        height: "35px",
                        border: "none"
                      }} onClick={() =>this.handleTokenSelect(token['id'])}>Select</button>
              </CardActions>
            </Card>
            )):(this.state.isPolygon?(<div style={{color:'#000', zIndex: 9999, marginLeft: '10%'}}><p><img src={emptyToken} style={{height: '325px'}}></img></p>Looks like you don't have a valid NFT from NxtLandClub (NLC). Please visit and purchase a NLC NFT from our collection in <a href="https://testnets.opensea.io/collection/nlc-polygon" target="_blank">OpenSea</a></div>):
            (<div style={{color:'#000', zIndex: 9999, marginLeft: '10%'}}><p><img src={emptyToken} style={{height: '325px'}}></img></p>Looks like you don't have a valid NFT from NxtLandClub (NLC). Please visit and purchase a NLC NFT from our collection in <a href="https://testnets.opensea.io/collection/nxtlandclubv2" target="_blank">OpenSea</a></div>))}
        </div></div>):undefined}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
  systemCheck: state.systemCheck,
});

const EventWalletDetailsForm = Form.create({ name: "SysCheck" })(
  EventWalletDetails
);

export default connect(mapStateToProps, {
  initSysCheck,
  setWalletDetails,
})(EventWalletDetailsForm);
