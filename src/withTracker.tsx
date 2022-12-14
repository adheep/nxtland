import React, { Component } from "react";
import GoogleAnalytics from "react-ga";

GoogleAnalytics.initialize(process.env.REACT_APP_GAID || "UA-08082019-1");

const withTracker = (WrappedComponent:any, options = {}) => {
  const trackPage = (page:any) => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  };

  const BASENAME = process.env.REACT_APP_BASENAME || "";

  type MyProps = {
    location:any
  };
  type MyState = {};

  // eslint-disable-next-line
  const HOC = class extends Component<MyProps,MyState> {
    componentDidMount() {
      // eslint-disable-next-line
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(`${BASENAME}${page}`);
    }

    componentDidUpdate(prevProps:any) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search;
      const nextPage =
        this.props.location.pathname + this.props.location.search;

      if (currentPage !== nextPage) {
        trackPage(`${BASENAME}${nextPage}`);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
