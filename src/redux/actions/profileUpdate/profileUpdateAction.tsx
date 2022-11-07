import { UPDATE_PROFILE } from "../types";
import fetch from '../../../utils/leoFetch'
import axios from '../../../utils/leoAxios'
import { config } from "../../../config/configs";
 
export const updateUser = (username:any,status:any,values:any) => (dispatch:any) => {
    let payload = {
        userName:username,
        status:status,
        firstName: values.firstname,
        middleName: values.middlename,
        lastName: values.lastname
    }
    axios.post(config.apiRootPath+config.updateUserURL, payload,  {
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(res => {
           dispatch({
               payload:{
                   ...res.data
               },
               type: UPDATE_PROFILE
           })
        })
  };