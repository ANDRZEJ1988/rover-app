import React from 'react';
import {names, camera, day} from "../../constant/constant";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import {
    dateAction,
    dayAction,
    getCameraNameAction,
    getRoverNameAction,
    statusAction
} from "../../actions/actions";
import {
    cameraNameSelector,
    dateSelector,
    daySelector,
    pageSelector,
    roverNameSelector,
    statusSelector
} from "../../store/selectors";
import {useHistory} from 'react-router-dom';
import {load} from "../../functions/function";
import './List.scss'

export const List = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const roverName = useSelector(roverNameSelector);
    const cameraName = useSelector(cameraNameSelector);
    const status = useSelector(statusSelector);
    const daySelected = useSelector(daySelector);
    const dateSelected = useSelector(dateSelector);
    const pageSelected = useSelector(pageSelector);
    const chooseRover = (event, dispatch) => {
        const rover = event.target.value;
        dispatch(getRoverNameAction(rover));
        (rover.length !== 0 && daySelected.length !== 0 && dateSelected.length !== 0) ? dispatch(statusAction(true))
            : dispatch(statusAction(false));
    };
    const chooseCamera = (event, dispatch) => {
        const cameras = event.target.value;
        dispatch(getCameraNameAction(cameras));
    };
    const chooseDay = (event, dispatch) => {
        const days = event.target.value;
        dispatch(dayAction(days));
        const empty = '';
        if (days.length === 0) {
            dispatch(dayAction(empty));
            dispatch(dateAction(empty));
        }
        (dateSelected.length !== 0 && roverName.length !== 0 && days.length !== 0) ? dispatch(statusAction(true))
            : dispatch(statusAction(false));
    };
    const getDate = (event) => {
        const days = event.target.value;
        const empty = '';
        if (days <= 0) {
            event.target.value = '';
            dispatch(dateAction(empty));
            alert('Please type correct day');
        }
        if (isNaN(days)) {
            event.target.value = '';
            dispatch(dateAction(empty));
            alert('Please type correct day');
        } else {
            dispatch(dateAction(days));
            days.length === 0 && dispatch(dateAction(empty));
            (daySelected.length !== 0 && roverName.length !== 0 && days.length !== 0) ? dispatch(statusAction(true))
                : dispatch(statusAction(false));
        }
    };
    const onChange = (date, dateString) => {
        dispatch(dateAction(dateString));
        dispatch(statusAction(true));
        const empty = '';
        dateString.length === 0 && dispatch(dateAction(empty));
        (daySelected.length !== 0 && roverName.length !== 0 && dateString.length !== 0) ? dispatch(statusAction(true))
            : dispatch(statusAction(false));

    };

    const getList = () => {
        load(roverName, daySelected, dateSelected, cameraName, pageSelected, dispatch);
        history.push(`/photo/page=${pageSelected}`);
    };

    return (
        <div className='all'>
            <div className='all-selected'>
                <span className='all-selected'>Choose rover </span>
                <select className='all-selected-sel' name="" id="" onChange={(event) => chooseRover(event, dispatch)}>{
                    names.map((value, index) => {
                        return (
                            <option className="option" value={value} key={index}>{value}</option>
                        )
                    })
                }</select>
            </div>
            <div className='all-selected'>
                <span className='all-selected'>Also you can choose camera </span>
                <select className='all-selected-sel' name="" id="" onChange={(event) => chooseCamera(event, dispatch)}>{
                    camera.map((value, index) => {
                        return (
                            <option className="option" value={value} key={index + 100}>{value}</option>
                        )
                    })
                }</select>
            </div>
            <div className='all-selected'>
                <span className='all-selected'>Choose between Martian sol and Earth date </span>
                <select className='all-selected-sel' name="" id="" onChange={(event) => chooseDay(event, dispatch)}>{
                    day.map((value, index) => {
                        return (
                            <option className="option" value={value} key={index + 200}>{value}</option>
                        )
                    })
                }</select>
                {daySelected === 'sol' && <div className='all-selected'>
                    <span className='all-selected'>Choose day from the rover's landing date </span>
                    <input className='all-selected-inp' type="text" onChange={getDate}/>
                </div>}
                {daySelected === 'earth_date' && <div className='all-selected'>
                    <span className='all-selected'>Choose Earth date </span>
                    <DatePicker placeholder="select date" onChange={onChange}/>
                </div>}
            </div>
            {status && <div className='all-selected'>
                <button className='all-selected-btn' onClick={getList}>get list</button>
            </div>}
        </div>
    );
}

export default List;