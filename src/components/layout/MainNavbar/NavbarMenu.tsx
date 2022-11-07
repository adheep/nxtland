import React, { Component } from "react";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

class NavbarMenu extends Component {

  render() {
    return (
      <div style={{ width: "75%" }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['0']}
          className="navHeaderMenu"
        >
          <SubMenu
            title={< span className="submenu-title-wrapper" > <Icon type="setting" />Teest</span>}>
            <Menu.ItemGroup>
              <Menu.Item key="setting:2">
                <a href="/viewapplication">Sample</a>
              </Menu.Item>
              <Menu.Item key="setting:1">
                <a href="/addapplication">Sample</a>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu
            title={< span className="submenu-title-wrapper" > <Icon type="setting" />Sample</span>}>
            <Menu.ItemGroup>
              <Menu.Item key="setting:1">
                <a href="/viewproject">Sample</a>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <a href="/addproject">Sample</a>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu
            title={<span className="submenu-title-wrapper" > <Icon type="setting" />Testing</span>}>
            <Menu.ItemGroup>
              <Menu.Item key="setting:1">
                <a href="/viewtool">Sample</a>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <a href="/addtool">Sample</a>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>

      </div>
    )
  }
}

export default NavbarMenu;