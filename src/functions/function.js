import {apiKey} from "../constant/constant";
import {getListAction} from "../actions/actions";

export const load = async (roverName, daySelected, dateSelected, cameraName, pageSelected, dispatch) => {
    try {
        const request = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?${daySelected}=${dateSelected}&${cameraName ? `camera=${cameraName}` : `camera?`}&page=${pageSelected}&api_key=${apiKey}`);
        const jsonRequest = await request.json();
        const {photos} = jsonRequest
        dispatch(getListAction(photos));
    } catch (e) {
        console.log(e);
    }
}