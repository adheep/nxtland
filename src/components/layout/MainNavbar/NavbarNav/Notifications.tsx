import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import Websocket from 'react-websocket'
import {config} from './../../../../config/configs'

type notificationTemplate = {
  icon: string,
  category: string,
  message: string,
  type: string
}

type MyState = {
  visible: boolean,
  count: any,
  notifications: Array<notificationTemplate>
};

export default class Notifications extends React.Component<{},MyState> {
  constructor(props:any) {
    super(props);

    this.state = {
      visible: false,
      count: 0,
      notifications: [
        {
          icon: '&#xE6E1;',
          category: 'General',
          type: 'INFO',
          message: 'Please keep your credentials safe, do not share it with anyone'
        }
      ]
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({visible: (this.state.visible?false:true)})
  }

  handleData(data) {
    let result = JSON.parse(data);
    let notifications = [result, ...this.state.notifications];
    this.setState({notifications});
  }

  render() {
    let dropdownItems = this.state.notifications.map(notification => {
      let style = {};

      if(notification.type==="ERROR") {
        style = {color: 'red'}
      } else if(notification.type==="WARN") {
        style = {color: '#ffc107'}
      }
      return (
        <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                  {notification.type==='ERROR'?(<i className="material-icons"> &#xe001;</i>):(undefined)}
                  {notification.type==='WARN'?(<i className="material-icons"> &#xe002;</i>):(undefined)}
                  {notification.type==='INFO'?(<i className="material-icons"> &#xe7f4;</i>):(undefined)}
              </div>
            </div>
            <div className="notification__content">
              {notification.category!==''?
              (<span className="notification__category">{notification.category}</span>):undefined}
              <p style={style}>
                {notification.message}
              </p>
            </div>
          </DropdownItem>
      );
    });

    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              {this.state.notifications.length}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          {dropdownItems}
          <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem>
        </Collapse>

        <Websocket url={config.websocketURL} onMessage={this.handleData.bind(this)}/>

      </NavItem>
    );
  }
}
