import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import List from "../list/List";
import {Photo} from "../photo/Photo";

export const Navigation = () => {
    return (
        <Switch>
            <Route path="/" exact
                   render={(routerProps) => {
                       return <List {...routerProps}/>
                   }}>
            </Route>
            <Route path="/photo/page=:number" exact
                   render={(routerProps) => {
                       return <Photo {...routerProps}/>
                   }}>
            </Route>
            <Redirect from="*" to="/" exact/>
        </Switch>
    );
}

