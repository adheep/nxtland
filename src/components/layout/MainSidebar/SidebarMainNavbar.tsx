import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

import { Dispatcher, Constants } from "../../../resources/flux";

let navbarStyle:any;

type MyProps = {
  leftNav: boolean,
  hideLogoText: boolean
};
type MyState = {
  menuVisible: boolean,
  sidebarNavItems: Array<any>,
  sidebarNavVisibile: boolean
};
class SidebarMainNavbar extends React.Component<MyProps,MyState> {
  constructor(props:any) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  componentWillMount() {
    if(this.props.leftNav) {
      navbarStyle = "align-items-stretch bg-white flex-md-nowrap border-bottom p-0";
    } else {
      navbarStyle = "align-items-stretch bg-white flex-md-nowrap p-0";
    }
  }

  render() {
    const { hideLogoText } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className={navbarStyle}
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "150px", marginTop: '-25px'}}
                src={require("../.././../assets/images/livfair.png")}
                alt="LivFair"
              />
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

export default SidebarMainNavbar;
