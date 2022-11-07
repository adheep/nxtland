import { CHANGE_PASSWORD } from "../types";
import fetch from '../../../utils/leoFetch'
import axios from '../../../utils/leoAxios'
import {config} from './../../../config/configs'
 
export const changePassword = (values:any) => (dispatch:any) => {
    let payload = {
        userName:values.Email,
        password: values.ConfirmPassword
    }
    axios.post(config.apiRootPath+config.changePasswordURL, payload,  {
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(res => {
           dispatch({
               payload:{
                   ...res.data
               },
               type: CHANGE_PASSWORD
           })
        })
  };