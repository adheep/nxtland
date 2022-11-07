import {
  RESET_FAILED,
  RESET_SUCCESS,
  OTP_RESET_SUCCESS,
  OTP_RESET_FAILED,
  RESET_VALUES
} from "../types";
import axios from "../../../utils/leoAxios";
import { config } from "../../../config/configs";

export const resetValues = () => (dispatch: any) => {
  dispatch({
    payload: {},
    type: RESET_VALUES,
  });
}

export const resetAction = (values: any) => (dispatch: any) => {
  let payload = { ...values };
  axios
    .post(config.apiRootPath + config.resetURL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      if (res.success == false) {
        dispatch({ payload: {isResetPassword: false}, resetErrorMessage: "Server busy, please try again later", type: RESET_FAILED });
      } else {
        dispatch({
          payload: { ...values, resetErrorMessage: "", isResetPassword: true, ...res },
          type: RESET_SUCCESS,
        });
      }
    }).catch((err:any) => {
      let errorMessage = "Server Error. Try again after sometime";
      if(err.response) {
        errorMessage = err.response.data;
      }
      dispatch({ payload: {resetErrorMessage: errorMessage['message']['userMessage']}, type: OTP_RESET_FAILED });
    });
};

export const validateOTP = (values: any) => (dispatch: any) => {
  let payload = { ...values };
  axios
    .post(config.apiRootPath + config.resetPassword, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      if (res.data.success == true) {
        dispatch({
          type: OTP_RESET_SUCCESS,
          payload: {
            ...values,
            ...res.data,
            otpValidated: true,
            otpErrorMessage: "",
          },
        });
      } else {
        dispatch({
          type: OTP_RESET_FAILED,
          payload: {
            ...values,
            ...res.data,
            otpValidated: false,
            otpErrorMessage: "Please try again",
          },
        });
      }
    }).catch((err:any) => {
      let errorMessage = "Server Error. Try again after sometime";
      if(err.response) {
        errorMessage = err.response.data;
      }
      dispatch({ payload: {otpErrorMessage: errorMessage['message']['userMessage']}, type: OTP_RESET_FAILED });
    });
};
