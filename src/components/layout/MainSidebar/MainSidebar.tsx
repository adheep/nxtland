import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../resources/flux";

let leftNavStyle = {};

type MyProps = {
  leftNav: boolean,
  hideLogoText: boolean
};
type MyState = {
  menuVisible: boolean,
  sidebarNavItems: Array<any>,
  sidebarNavVisibile: boolean
};

class MainSidebar extends React.Component<MyProps,MyState> {
  constructor(props:any) {
    super(props);

    this.state = {
      menuVisible: false,
      sidebarNavItems: Store.getSidebarItems(),
      sidebarNavVisibile: false
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
    this.setState({
      sidebarNavVisibile: this.props.leftNav
    })
    if(!this.props.leftNav) {
      leftNavStyle = {
        display: "block",
        height: "60px",
        boxShadow: "0 0.125rem 0.625rem rgba(90,97,105,.12)"
      }
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }

  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.state.menuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 3 }}
        style={leftNavStyle}
      >
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} leftNav={this.props.leftNav}/>
        <SidebarSearch />
        {this.props.leftNav === true? <SidebarNavItems />: null}
      </Col>
    );
  }
}

export default MainSidebar;
