import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from "./App";
import StartScreen from "./screen/StartScreen";
import SettingsScreen from "./screen/SettingsScreen";


export default (
    <Route path='/' component={App}>
        <IndexRoute component={StartScreen}/>
        <Route path='/settings' component={SettingsScreen}/>
    </Route>
);