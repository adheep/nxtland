import React from "react";
import PropTypes from "prop-types";
import { Container} from "shards-react";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const LoginLayout = ({ children, noNavbar, noFooter }:{children:any, noNavbar:any, noFooter:any}) => (
  <Container fluid>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          {/* Same as */}
        <ToastContainer />
  </Container>
);

LoginLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

LoginLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default LoginLayout;
