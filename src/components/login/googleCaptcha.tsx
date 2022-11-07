import React, { Component } from 'react'

export default class GoogleCaptcha extends Component {
    render() {
        return (
            <form name="myForm">
                <div className="form-control captcha-box">
                    <div className="g-recaptcha" data-sitekey="6Le7X-gUAAAAAMchZc3bh29tTi3XWNcXbXA8v8lC"></div>
                </div>
            </form>
        )
    }
}
