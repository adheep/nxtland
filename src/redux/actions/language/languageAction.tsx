import { LANGUAGE } from '../types';

/* Select Language */
export const inmemoryLanguage = (objData) => dispatch => {
    dispatch({
      payload: objData,
      type: LANGUAGE
    });
  };