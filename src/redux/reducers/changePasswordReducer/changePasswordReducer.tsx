import { CHANGE_PASSWORD } from "../../actions/types";

const initialState = {
    passwordUpdate: {}
  };

  export default function(state = initialState, action:any) {
    switch (action.type) {
      case CHANGE_PASSWORD:
        return {
          ...state,
          passwordUpdate: action.payload
        };
      default:
          return state;
    }
  
  }