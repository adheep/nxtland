import {
  LOGIN,
  LOGOUT,
  OTP_VALIDATION_SUCCESS,
  RESET_SUCCESS,
  RESET_FAILED,
  SET_WALLET_DETAILS,
} from "../../actions/types";
import axios from "axios";
import { config } from "../../../config/configs";

let jwtDecode = require("jwt-decode");
const initialState = {
  Email: null,
  isLoggedIn: false,
  redirect: false,
  token: null,
};
let accessToken = sessionStorage.getItem("accessToken");

async function getInitialState() {
  if (accessToken !== null && accessToken !== undefined) {
    var decoded = jwtDecode(accessToken);
    decoded["profileUrl"] = await getProfileUrl(accessToken);
    let initialState = {
      firstname: decoded.firstname,
      middlename: decoded.middlename,
      lastname: decoded.lastname,
      username: decoded.username,
      status: decoded.status,
      userDetail: decoded,
      emailId: decoded.emailId,
      roleName: decoded.roleName,
      Email: decoded.emailId,
      isLoggedIn: true,
      redirect: true,
      token: accessToken,
    };
    return initialState;
  } else {
    return initialState;
  }
}

const getProfileUrl = (accessToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.apiRootPath + "/v1/profileUrl", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        resolve(res.data.profileUrl);
      });
  });
};

export default function (state = getInitialState(), action: any) {
  switch (action.type) {
    case LOGIN:
      return {
        ...action.payload,
      };
    case LOGOUT:
      return {
        ...action.payload,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FAILED:
      return {
        ...state,
        ...action.payload,
      };
    case SET_WALLET_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
