import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import EventNavbar from "../exhiTemplate/EventNavbar";
import { loadAdminDashboard } from "../../redux/actions/dashboard/dashboardActions";
import { Button } from 'antd';
import EventConfiguration from './EventConfiguration'

type MyProps = {
  dashboard: any;
  loadAdminDashboard: any;
};
let cards = [
  {
    name: "Users",
    values: 123,
  },
  {
    name: "Users",
    values: 123,
  },
  {
    name: "Users",
    values: 123,
  },
  {
    name: "Users",
    values: 123,
  },
  {
    name: "Users",
    values: 123,
  },
  {
    name: "Users",
    values: 123,
  },
];
class AdminDashboard extends React.Component<MyProps, {}> {
  componentDidMount() {
    this.props.loadAdminDashboard();
    // setInterval(()=>{
    //   this.props.loadAdminDashboard()
    // },3000)
  }
  handleClick(event){
    alert("TEst")
  }
  render() {
    return (
      <div>
        <EventNavbar></EventNavbar>

        <div className="body-inner">
          <div
            id="page-banner-area"
            className="page-banner-area"
            style={{
              backgroundImage: "url(images/banner/leanr_bg.png)",
              minHeight: "70px",
            }}
          ></div>

          <div
            className="banner-item "
            style={{ backgroundColor: "#110b29", minHeight: "720px",position:'static' }}
          >                      
            <div className="container" style={{paddingTop:'40px'}}>
              <div>
                <div className="row">
                  {this.props.dashboard.summary.length > 0 ? (
                    this.props.dashboard.summary.map((card) => {
                      return (
                        <div
                          className="col-md-3 card"
                          key={card.name}
                          style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            margin: "8px",
                          }}
                        >
                          <h4>{card.name}</h4>
                          <hr />
                          <p>{card.value}</p>
                        </div>

                        // <div className="card" style={{ textAlign: "center" }}>
                        //   {card.name}
                        //   <div className="container">
                        //     <h4>{card.value}</h4>
                        //   </div>
                        // </div>
                      );
                    })
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            </div>
                      <EventConfiguration></EventConfiguration>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { loadAdminDashboard })(AdminDashboard);
