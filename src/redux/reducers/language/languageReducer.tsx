import { LANGUAGE } from '../../actions/types';

const initialState = {
    language : 'en'
}

export default function(state = initialState, action:any) {
    switch (action.type) {
        case LANGUAGE:
            return {
                ...state,
                language: action.payload
            };

        default:
            return state;
    }
}
