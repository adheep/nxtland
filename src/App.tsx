import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from 'react-redux';
import store from './store';
import {config} from './config/configs'
export default() => (
    <Provider store={store}>
        <Router basename={config.appBaseName || ""}>
            <div>
                {routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={withTracker((props:any) => {
                            return (
                                <route.layout {...props}>
                                    <route.component {...props}/>
                                </route.layout>
                            );
                        })}/>
                    );
                })}
            </div>
        </Router>
    </Provider>
);
