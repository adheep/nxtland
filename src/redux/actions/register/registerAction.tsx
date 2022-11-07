import {
  REGISTER_USER,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  OTP_VALIDATION_FAILURE,
  OTP_VALIDATION_SUCCESS,
} from "../types";
import fetch from "../../../utils/leoFetch";
import axios from "../../../utils/leoAxios";
import history from "../../../history";
import Global from "../../../components/layout/Global/Global";
import message from "../../../components/messages/message.json";
import { config } from "../../../config/configs";

export const registerAction = (values: any) => (dispatch: any) => {
  let payload = { ...values };

  axios
    .post(config.apiRootPath + config.registerURL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      if (res.data.success == "false") {
       
        dispatch({ payload: {...values,...res.data}, type: REGISTRATION_FAILED });
      } else {
        dispatch({
          payload: { ...values, isRegistered: true, ...res },
          type: REGISTRATION_SUCCESS,
        });
      }
    })
};

export const validateOTP = (values: any) => (dispatch: any) => {
  let payload = { ...values };
  axios
    .post(config.apiRootPath + config.validateOTP, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      if (res.data.success == true) {
        dispatch({
          type: OTP_VALIDATION_SUCCESS,
          payload: {
            ...values,
            ...res.data,
            otpValidated: true,
            otpValidationMessage: "",
          },
        });
      } else {
        dispatch({
          type: OTP_VALIDATION_FAILURE,
          payload: {
            ...res.data          },
        });
      }
    });
};