import {
    CHANGE_STATUS,
    GET_CAMERA_NAME,
    GET_DATE,
    GET_DAY,
    GET_LIST,
    GET_PAGE,
    GET_ROVER_NAME,
} from "./actions-type";

export const getListAction = (list) => {
    return (
        {
            type: GET_LIST,
            payload: list
        }
    )
};
export const getRoverNameAction = (name) => {
    return (
        {
            type: GET_ROVER_NAME,
            payload: name
        }
    )
};
export const getCameraNameAction = (name) => {
    return (
        {
            type: GET_CAMERA_NAME,
            payload: name
        }
    )
};
export const statusAction = (name) => {
    return (
        {
            type: CHANGE_STATUS,
            payload: name
        }
    )
};
export const dayAction = (day) => {
    return (
        {
            type: GET_DAY,
            payload: day
        }
    )
};
export const dateAction = (date) => {
    return (
        {
            type: GET_DATE,
            payload: date
        }
    )
};
export const pageAction = (page) => {
    return (
        {
            type: GET_PAGE,
            payload: page
        }
    )
};
