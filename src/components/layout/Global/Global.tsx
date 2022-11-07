import { createBrowserHistory } from 'history';

export default class Global {
    static history = createBrowserHistory();

    static alertContent = {
        closable: true,
        message: "",
        status: 'info'
    }

    static clearAlert() {
        Global.alertContent = {
            closable: true,
            message: "",
            status: 'info'
        }
    }

    static isCustomerAuthenticated() {
        if (localStorage.getItem('token') &&
            localStorage.getItem('token') !== null &&
            localStorage.getItem('token') !== undefined &&
            localStorage.getItem('token') !== '') {
            return true;
        } else {
            return false;
        }
    }


}
