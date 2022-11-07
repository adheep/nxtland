import {combineReducers} from 'redux';
import loginReducer from '../reducers/login/loginReducer';
import languageReducer from "../reducers/language/languageReducer";
import userProfileReducer from "../reducers/profileUpdateReducer/profileUpdateReducer";
import changePasswordReducer from "../reducers/changePasswordReducer/changePasswordReducer";
import metaDataReducer from "./metadata/metadataReducer"
import registerReducer from '../reducers/register/registerReducer'
import systemCheckReducer from './metadata/systemCheckReducer';
import dashboardReducer from '../reducers/dashboard/dashboardReducer'
import resetReducer from '../reducers/login/resetReducer'
import { reducer as reduxFormReducer } from 'redux-form'


export default combineReducers({
    languageDatum : languageReducer,
    loginData: loginReducer,
    userProfile: userProfileReducer,
    changePassword: changePasswordReducer,
    metaData: metaDataReducer,
    registration:registerReducer,
    systemCheck: systemCheckReducer,
    dashboard:dashboardReducer,
    resetStatus: resetReducer,
    form: reduxFormReducer
});
