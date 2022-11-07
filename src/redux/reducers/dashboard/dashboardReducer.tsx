import { LOAD_DASHBOARD,LOAD_EVENTS,CONFIGURE_EVENT } from "../../actions/types";

const initialState = {
    summary:[],
    events:[],
    exhibitors:[],
    initialValues:{}
  };

export default function (state = initialState, action: any) {
    switch (action.type) {
      case LOAD_DASHBOARD:
        return {
          ...state,summary:[...action.payload],
        };
      case LOAD_EVENTS:{
        return {
          ...state,events:action.payload
        };
      }
      case CONFIGURE_EVENT :{
       return  {...state,initialValues:action.payload.event,exhibitors:action.payload.exhibitors}
      }
        
      default:
        return state;
    }
  }