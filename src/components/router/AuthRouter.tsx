import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { Empty } from 'antd';
import Global from '../layout/Global/Global';
import {config} from '../../config/configs'

type MyProps = {
  authNeeded: boolean,
  loginData: any
};
type MyState = {
  email: string,
  password: string,
  redirect: boolean,
  isLoggedIn: boolean,
  loginErrorMsg: string
};

class AuthRouter extends Component<MyProps,MyState> {
    renderRedirect = () => {
        if (this.props.authNeeded) {
            if(this.props.loginData.token !== null && this.props.loginData.token !== undefined && this.props.loginData.token !== "" && this.props.loginData.token !== "null" ){
                jwt.verify(this.props.loginData.token, config.secretKey, function (err:any, decoded:any) {

                    if (err) {
                        Global.history.push("/");
                    }
                });
            } else{
                Global.history.push("/");
            }

        }
    }
    render() {
        return (
            <div>
                {this.renderRedirect}
            </div>
        )
    }
}
const mapStateToProps = (state:any) => ({ loginData: state.loginData });

export default connect(mapStateToProps, null)(AuthRouter);
