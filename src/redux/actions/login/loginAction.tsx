import {
  LOGIN,
  LOGOUT,
  CHANGE_PASSWORD,
  META_DATA,
  SYSCHECK_PASSED,
  SYSCHECK_FAILED,
  RESET_EVENT,
  RESET_FAILED,
  RESET_SUCCESS,
  OTP_VALIDATION_SUCCESS,
  OTP_VALIDATION_FAILURE,
  SET_WALLET_DETAILS
} from "../types";
import fetch from "../../../utils/leoFetch";
import axios from "../../../utils/leoAxios";
import history from "../../../history";
// import Global from '../../../../src/components/layout/Global/Global.js';
import Global from "../../../components/layout/Global/Global";
import message from "../../../components/messages/message.json";
import { config } from "../../../config/configs";

let cryptoJs = require("crypto-js");
let jwtDecode = require("jwt-decode");

export const logoutAction = () => (dispatch: any) => {
  let loginData = {
    isLoggedIn: false,
    redirect: false,
    token: null,
  };
  for (var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);

    if (!key.startsWith("wallet-")) {
        localStorage.removeItem(key);
    }
  }
  sessionStorage.clear();
  dispatch({
    payload: loginData,
    type: LOGOUT,
  });
};

export const loginAction = (values: any) => (dispatch: any) => {
  let payload = {
    userId: values.userName,
    password: values.password,
    address: values.address
  };

  let loginData = {
    Name: null,
    userName: null,
    isLoggedIn: false,
    password: null, // for reference
    redirect: false,
    token: null,
  };

  axios
    .post(config.apiRootPath + config.authenticationURL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if(res && res.data.success) {
        var token = res.data.token;
        sessionStorage.setItem("accessToken", token);

        axios.get(config.apiRootPath+'/v1/profileUrl',{headers:{
          'Authorization': `Bearer ${token}`
        }}).then(profileRes =>{
          let profileData = profileRes.data;;
          let {profileUrl} = profileData;
          
          if (token !== null && token !== undefined) {
            var decoded = jwtDecode(token);
            decoded['profileUrl'] = profileUrl;
            dispatch({
              payload: {
                ...res.data,
                token: token,
                firstname: decoded.firstname,
                middlename: decoded.middlename,
                lastname: decoded.lastname,
                username: decoded.username,
                status: decoded.status,
                userDetail: decoded,
                emailId: decoded.emailId,
                roleName: decoded.roleName,
                isLoggedIn: true,
                redirect: true,
                profileUrl,
                walletAddress: values.address
              },
              type: LOGIN,
            });
          } else {
            dispatch({
              payload: {
                ...loginData,
                message: message.loginErrorMessage,
              },
              type: LOGIN,
            });
          }
        })

        
      } else {
        dispatch({
          payload: {
            ...loginData,
            message: message.loginErrorMessage,
          },
          type: LOGIN,
        });
      }
    });
};

export const completeSysCheck = (values: any) => async (dispatch: any) => {
  if (
    values["os"] &&
    values["browser"] &&
    values["bandwidth"] &&
    values["webgl"]
  ) {
    dispatch({
      payload: {...values},
      type: SYSCHECK_PASSED,
    });
  } else {
    dispatch({
      payload: {},
      type: SYSCHECK_FAILED,
    });
  }
};

export const changePassword = (values: any) => async (dispatch: any) => {
  var options = {
    ConfirmPassword: values.ConfirmPassword,
    Email: values.Email,
    OldPassword: values.OldPassword,
  };
  await axios
    .put(config.apiRootPath + config.changePasswordURL, options)
    .then((resp) => {
      if (resp.data.status === "SUCCESS") {
        Global.alertContent = {
          closable: false,
          message: resp.data.userMessage,
          status: "success",
        };
        dispatch({
          payload: {},
          type: CHANGE_PASSWORD,
        });
      } else {
        Global.alertContent = {
          closable: true,
          message: resp.data.userMessage,
          status: "error",
        };
        dispatch({
          payload: {},
          type: CHANGE_PASSWORD,
        });
      }
    });
};

export const getMetaData = (values: any) => async (dispatch: any) => {
  var options = {
    hostname: window.location.hostname,
  };
  await axios
    .post(config.apiRootPath + config.getMetaDataURL, options)
    .then((resp) => {
      var bytes = cryptoJs.AES.decrypt(resp.data["metaData"], config.secretKey);
      let data = bytes.toString(cryptoJs.enc.Utf8);
      let decryptedData = JSON.parse(data);
      decryptedData.style = JSON.parse(decryptedData.style);
      decryptedData.other_metadata = JSON.parse(decryptedData.other_metadata);
      dispatch({
        payload: decryptedData,
        type: META_DATA,
      });
    });
};

export const resetEvent = (values: any) => async (dispatch: any) => {
  dispatch({
    payload: {
    },
    type: RESET_EVENT,
  });
};

export const setWalletDetails = (values: any) => async (dispatch: any) => {
  dispatch({
    payload: {
      ...values
    },
    type: SET_WALLET_DETAILS,
  });
};
