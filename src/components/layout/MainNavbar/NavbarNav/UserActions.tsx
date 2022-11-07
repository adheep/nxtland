import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import {connect} from 'react-redux';

type MyProps = { loginData: {
  firstName: string
}};
type MyState = { visible: boolean };
class UserActions extends React.Component<MyProps,MyState> {
  constructor(props:any) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <i className="material-icons" style={{fontSize: '2rem'}}>account_circle</i>{" "}
          <span className="d-none d-md-inline-block">{this.props.loginData.firstName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/editprofile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/changepassword">
            <i className="material-icons">&#xE7FD;</i>Change Password
          </DropdownItem>
          {/* <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider /> */}
          <DropdownItem tag='a' href="/login" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
const mapStateToProps = (state:any) => ({loginData: state.loginData});
export default connect(mapStateToProps)(UserActions);
