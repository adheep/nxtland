import { LOAD_DASHBOARD,LOAD_EVENTS,CONFIGURE_EVENT } from "../types";
import axios from "../../../utils/leoAxios";

import { config } from "../../../config/configs";

export const loadDashboard = (values: any) => (dispatch: any) => {
  axios
    .get(config.apiRootPath + config.loadDashboard, {
      headers: {
        "Content-Type": "application/json",
        "Authorization":'Bearer '+sessionStorage.getItem('accessToken')
      },
    })
    .then((res: any) => {
      if (res.data.success) {
        let { summary } = res.data;
        dispatch({
          payload: summary,
          type: LOAD_DASHBOARD,
        });
      }
    });
};


export const loadEvents =  (values:any) => (dispath:any)=>{
  // axios.get(config.eventConfigurationBaseURL+config.getEvents,{
  //   headers:{
  //     'Content-Type':'application/json'
  //   }
  // }).then((res:any)=>{
  //   console.log(res)
  //   if(res.data.success){
  //     console.log(res.data)
  //     let {events} = res.data;
  //     dispath({
  //       payload:events,
  //       type:LOAD_EVENTS
  //     })
  //   }
  // })

  fetch(config.eventConfigurationBaseURL+config.getEvents).then(res=>res.json()).then((data)=>{
    if(data.status){
      let {events} = data;
      dispath({
        payload:events,
        type:LOAD_EVENTS
      })
    }
  })
}

export const configureEvent = (values:any) => (dispatch:any)=>{
  let {eventId,events} = values
  let event = events.filter((x:any)=>{ return x.eventId== eventId})[0]
  fetch(config.eventConfigurationBaseURL+'getExhibitors'+'/'+eventId).then(data=>data.json()).then(response=>{
    let {exhibitors} = response;
    dispatch({
      payload:{name:'eduFair2022',event,exhibitors},
      type:CONFIGURE_EVENT
    })
  })
  
}

export const loadAdminDashboard = (values: any) => (dispatch: any) => {
  axios
    .get(config.apiRootPath + config.loadAdminDashboard, {
      headers: {
        "Content-Type": "application/json",
        "Authorization":'Bearer '+sessionStorage.getItem('accessToken')
      },
    })
    .then((res: any) => {
      if (res.data.success) {
        let { summary } = res.data;
        dispatch({
          payload: summary,
          type: LOAD_DASHBOARD,
        });
      }
    });
};