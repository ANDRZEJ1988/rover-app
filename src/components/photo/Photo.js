import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    cameraNameSelector,
    dateSelector,
    daySelector,
    listSelector, pageSelector,
    roverNameSelector,
} from "../../store/selectors";
import './Photo.scss';
import {useHistory} from "react-router-dom";
import {
    dateAction,
    dayAction,
    getCameraNameAction,
    getRoverNameAction,
    pageAction, statusAction
} from "../../actions/actions";
import {load} from "../../functions/function";

export const Photo = () => {
    const list = useSelector(listSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const roverName = useSelector(roverNameSelector);
    const cameraName = useSelector(cameraNameSelector);
    const daySelected = useSelector(daySelector);
    const dateSelected = useSelector(dateSelector);
    const pageSelected = useSelector(pageSelector);
    const loadMore = () => {
        const newPage = pageSelected + 1;
        load(roverName, daySelected, dateSelected, cameraName, newPage, dispatch);
        dispatch(pageAction(newPage));
        history.push(`/photo/page=${newPage}`);
    };
    const loadMain = () => {
        dispatch(getRoverNameAction(''));
        dispatch(dayAction(''));
        dispatch(dateAction(''));
        dispatch(getCameraNameAction(''));
        dispatch(pageAction(1));
        dispatch(statusAction(false));
        history.push('/');
    };
    return (
        <div >
            <div className="button">
                <button className="button-btn" onClick={loadMore}>load more</button>
                <button className="button-btn" onClick={loadMain}>main page</button>
            </div>
            {list.length !== 0 ? (<div>
                    <h1>
                        Photos were made
                        by {roverName} {cameraName ? `on ${cameraName}` : ''} {daySelected ? `on ${dateSelected} of ${daySelected}` : ''}
                    </h1>
                </div>)
                : (
                    <div>
                        <h1>
                            There are no photos. Please choose other parameters.
                        </h1>
                    </div>
                )}
                <div className="box">{
                    list.map(value => {
                        return (
                            <div className="card" key={value.id}>
                                <img className="card-image" src={value.img_src} alt="img"  />
                            </div>
                        )
                    })
                }
                </div>
        </div>
    );
}

