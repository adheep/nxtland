import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";

const LeftNavLayout = ({ children, noNavbar, noFooter }:{children:any, noNavbar:any, noFooter:any}) => (
  <Container fluid>
    <Row>
      <MainSidebar leftNav={true} hideLogoText={false}/>
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
      </Col>
    </Row>
  </Container>
);

LeftNavLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

LeftNavLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default LeftNavLayout;
