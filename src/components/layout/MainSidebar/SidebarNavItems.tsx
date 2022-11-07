import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";

type MyProps = {};
type MyState = {
  navItems: Array<
    {
      title: string,
      htmlBefore: string,
      to: string,

    }
  >
};
class SidebarNavItems extends React.Component<MyProps, MyState> {
  constructor(props:any) {
    super(props)

    this.state = {
      navItems: [
        {
          title: "EduExpo 2020",
          htmlBefore: '<i class="material-icons">table_chart</i>',
          to: "/uiux",
        }
      ]
    };
  }


  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item:any, idx:any) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
