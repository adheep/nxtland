import {
  SYSCHECK_INIT,
  SYSCHECK_FAILED,
  SYSCHECK_PASSED,
  WEBGL_LOGOUT,
  SYSCHECK_CHAT
} from "../types";
import axios from "../../../utils/leoAxios";
import history from "../../../history";
import Global from "../../../components/layout/Global/Global";
import message from "../../../components/messages/message.json";
import { config } from "../../../config/configs";

export const initSysCheck = () => (dispatch: any) => {
  dispatch({
    payload: {
      systemCheck: true
    },
    type: SYSCHECK_INIT,
  });
};

export const webglLogout = () => (dispatch: any) => {
  dispatch({
    payload: {
      webglLogout: true
    },
    type: WEBGL_LOGOUT,
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
      payload: {},
      type: SYSCHECK_PASSED,
    });
  } else {
    dispatch({
      payload: {},
      type: SYSCHECK_FAILED,
    });
  }
};

export const getChatData = (values: any, callback) => (dispatch: any) => {
  axios
    .get(config.apiRootPath + config.getChatData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+values
      },
    })
    .then((res: any) => {
      if (res && res.data.success===true) {
        dispatch({
          payload: {exhibitorId: res.data.exhibitorId, exhibitorName: res.data.exhibitorName},
          type: SYSCHECK_CHAT,
        });
        callback('wss://api.land.io/'+res.data.exhibitorId);
      } else {
      }
    });
};
