import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, useParams, useRouteMatch
} from 'react-router-dom';

import './css/UI.css'
import './css/App.css';
import StartScreen from "./screen/StartScreen";
import Footer from "./ui/Footer";
import SettingsScreen from "./screen/SettingsScreen";
import BuildHistoryScreen from "./screen/BuildHistoryScreen";

function App() {
    const [settings, setSettings] = useState({
        repository: '',
        command: '',
        branch: 'master',
        sync: 10
    });

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/settings">
                        <SettingsScreen settings={[settings, setSettings]}/>
                    </Route>

                    <Route path="/build">
                        <Builds/>
                    </Route>

                    <Route path="/">
                        {settings.repository? <BuildHistoryScreen settings={settings}/> : <StartScreen/>}
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </Router>);

    function Builds() {
        let match = useRouteMatch();
        return (
            <Switch>
                <Route path={`${match.path}/:commit`}>
                    <Build/>
                </Route>
                <Route path={match.path}>
                    <BuildHistoryScreen settings={settings}/>
                </Route>
            </Switch>
        );
    }

    function Build() {
        let {commit} = useParams();
        return <h1>Commit hash: {commit}</h1>
    }
}

export default App;
