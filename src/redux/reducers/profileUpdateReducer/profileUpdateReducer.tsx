import { UPDATE_PROFILE } from "../../actions/types";

const initialState = {
    updateProfile: {}
  };

  export default function(state = initialState, action:any) {
    switch (action.type) {
      case UPDATE_PROFILE:
        return {
          ...state,
          updateProfile: action.payload
        };
      default:
          return state;
    }
  
  }