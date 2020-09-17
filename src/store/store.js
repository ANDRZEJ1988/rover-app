import {createStore} from "redux";

export const initialState = {
    list: [],
    roverName: '',
    cameraName: '',
    day: '',
    status: false,
    date: '',
    page: 1
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST':
            return {...state, list: action.payload};
        case 'GET_ROVER_NAME':
            return {...state, roverName: action.payload};
        case 'GET_CAMERA_NAME':
            return {...state, cameraName: action.payload};
        case 'CHANGE_STATUS':
            return {...state, status: action.payload};
        case 'GET_DAY':
            return {...state, day: action.payload};
        case 'GET_DATE':
            return {...state, date: action.payload};
        case 'GET_PAGE':
            return {...state, page: action.payload};
        default:
            return state;
    }
}
export const store = createStore(reducer);