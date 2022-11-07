import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Form } from 'antd';
import { connect } from 'react-redux';
import {logoutAction, resetEvent} from '../../redux/actions/login/loginAction'

type MyProps = {
  loginData: any;
  logoutAction: any;
  resetEvent: any;
};
type MyState = {
};
class Navbar extends React.Component<MyProps, MyState> {

  resetEvent = () => {
    this.props.resetEvent();
  }

  logout = () => {
    this.props.logoutAction();
  };

    render() {
        return (
            <div>
                {/* Header start */}
  <header id="header" className="header header-transparent">
    <div className="container" style={{ maxWidth: "inherit" }}>
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* logo*/}
        <a className="navbar-brand" href="/" >
          <img src="images/logos/nlc_logo.png" alt="" style={{width: '55px'}}/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{justifyContent: 'center'}}>
          <ul className="navbar-nav">
          {/* <li><NavLink className='active' to='/'>Home</NavLink></li> */}
          {/* <li><NavLink className='active' to='/about'>About EDUIGI</NavLink></li>
          <li><NavLink className='active' to='/speakers'>Exhibitors </NavLink></li>
          <li><NavLink className='active' to='/schedule'>Schedule</NavLink></li>
          <li><NavLink className='active' to='/faqs'>FAQs</NavLink></li>
          <li><NavLink className='active' to='/contact'>Contact Us</NavLink></li> */}
          {this.props.loginData.isLoggedIn?(undefined):(
            <li className="header-ticket nav-item">
              {/* <NavLink className='ticket-btn btn' to='/login' style={{color: 'white', fontSize: '16px', fontWeight: 700}}>Login</NavLink> */}
            </li>
          )}
          </ul>
        </div>
        {this.props.loginData.isLoggedIn?(
        <div>
        <NavLink className='ticket-btn .btn.fill btn' to='/event' style={{height: '40px', color: '#fff', backgroundColor: '#ff007a'}} onClick={this.resetEvent}>Join Event</NavLink>&nbsp;
        <span style={{ color: "white", fontSize: "18px!important" }}>
          <img
            className="schedule-slot-speakers"
            src="images/online.png"
            alt="online"
            style={{
              padding: "1px",
              width: "15px",
              marginBottom: "3px",
            }}
          />{" "}
          &nbsp;
          {this.props.loginData["userDetail"] === undefined
            ? undefined
            : this.props.loginData["userDetail"]["name"]}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <i
                  className="fa fa-sign-out"
                  aria-hidden="true"
                  style={{ color: "white", fontSize: 25 }}
                  onClick={this.logout}
                ></i>
        </div>
        ):(undefined)}
      </nav>
    </div>{/* container end*/}
  </header>
  {/*/ Header end */}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
  loginData: state.loginData,
});

const NavbarForm = Form.create({ name: "Login" })(Navbar);

export default connect(mapStateToProps, {logoutAction, resetEvent})(NavbarForm);
