import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import AuthRouter from '../components/router/AuthRouter';
import Global from "../components/layout/Global/Global";

const ProjectLayout = ({ children, noNavbar, authNeeded}:{children:any, noNavbar:any, authNeeded:any}) => (
  <Row>
    <AuthRouter authNeeded={authNeeded}/>
    <MainNavbar/>

    <Container fluid className="wrapper-container">
      <Col
        className="main-content"
        tag="main"
      >
        {children}
      </Col>
    </Container>
  </Row>
);

ProjectLayout.propTypes = {
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool
};

ProjectLayout.defaultProps = {
  noFooter: false,
  noNavbar: false
};

export default ProjectLayout;
