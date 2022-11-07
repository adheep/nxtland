import { LOGIN, LOGOUT, META_DATA, SYSCHECK_FAILED, SYSCHECK_PASSED, RESET_EVENT } from '../../actions/types';

const initialState = {
    Email: null,
    isLoggedIn: false,
    redirect: false,
    token: null,
    isValidated: false,
    systemData: {
      mobile: false
    }
}

export default function(state = initialState, action:any) {
    switch (action.type) {
        case META_DATA:
            return {
                ...action.payload
            };
        case SYSCHECK_PASSED:
            return {
              isValidated: true,
              ...action.payload
            }
        case SYSCHECK_FAILED:
            return {
              isValidated: false
            }
        case RESET_EVENT:
          return {
            ...state,
            isValidated: false
          }
        case LOGOUT:
          return {
            ...initialState
          };
        default:
            return state;
    }
}
