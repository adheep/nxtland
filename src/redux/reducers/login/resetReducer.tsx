import { RESET_VALUES, RESET_SUCCESS, RESET_FAILED, OTP_RESET_SUCCESS, OTP_RESET_FAILED } from "../../actions/types";
import { FastField } from "formik";

const initialState = {
  isResetPassword: false,
  otpValidated: false,
  otpSessionId: "",
  otpErrorMessage: "",
  resetErrorMessage: ""
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case RESET_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case RESET_FAILED:
      return {
        ...state,
        ...action.payload
      }
    case OTP_RESET_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case OTP_RESET_FAILED:
      return {
        ...state,
        ...action.payload
      }
    case RESET_VALUES:
      return {
        isResetPassword: false,
        otpValidated: false,
        otpSessionId: "",
        otpErrorMessage: "",
        resetErrorMessage: ""
      }
    default:
      return state;
  }
}
