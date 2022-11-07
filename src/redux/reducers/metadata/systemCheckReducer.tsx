import { LOGIN, LOGOUT, META_DATA, SYSCHECK_FAILED, SYSCHECK_PASSED, SYSCHECK_INIT, WEBGL_LOGOUT, RESET_EVENT, SYSCHECK_CHAT } from '../../actions/types';

const initialState = {
    systemCheck: false,
    isValidated: false,
    webglLogout: false
}

export default function(state = initialState, action:any) {
    switch (action.type) {
        case SYSCHECK_INIT:
          return {
            ...state,
            systemCheck: action.payload['systemCheck']
          }
        case WEBGL_LOGOUT:
          return {
            ...state,
            webglLogout: action.payload['webglLogout']
          }
        case SYSCHECK_PASSED:
            return {
              isValidated: true
            }
        case SYSCHECK_FAILED:
            return {
              isValidated: false
            }
        case SYSCHECK_CHAT:
            return {
              ...state,
              ...action.payload,
              chatUrl: 'wss://api.land.io/'
            }
        case RESET_EVENT:
          return {
            ...state,
            webglLogout: false
          }
        case LOGOUT:
          return {
            ...initialState
          };
        default:
            return state;
    }
}
