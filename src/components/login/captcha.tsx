import React, { Component } from 'react'
import  GoogleCaptcha  from "./googleCaptcha";
import {config} from '../../config/configs'

export default class Captcha extends Component {
    render() {
        if(config.captcha==="google"){
        return (
            <div>
                <GoogleCaptcha></GoogleCaptcha>
            </div>
        )
        }
        else{
            return(
                <div>Hi</div>
            )
        }
    }
}
