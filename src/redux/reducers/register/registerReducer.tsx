import {
    REGISTER_USER,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    OTP_VALIDATION_FAILURE,
    OTP_VALIDATION_SUCCESS,
  } from "../../actions/types";
  
  const initialState = {
    isRegistered: false,
    registrationErrorMessage: "",
    otpValidated: false,
    otpSessionId:'',
    otpValidationMessage: '',
  };
  
  export default function (state = initialState, action: any) {
    switch (action.type) {
      case REGISTER_USER:
        return {
          ...action.payload,
        };
      case REGISTRATION_SUCCESS:
        return {
          ...action.payload,
          registrationErrorMessage: "",
        };
      case REGISTRATION_FAILED: {
        return {
          ...action.payload,
          isRegistered: false,
          registrationErrorMessage: action.payload.message.userMessage,
        };
      }
      case OTP_VALIDATION_SUCCESS: {
        return { ...action.payload };
      }
      case OTP_VALIDATION_FAILURE: {
        return {
            ...state,
          ...action.payload,
          otpValidated: false,
          registrationErrorMessage: "",
          isRegistered: true,
          otpValidationMessage: action.payload.message.userMessage,
        };
      }
      default:
        return state;
    }
  }