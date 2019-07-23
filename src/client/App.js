import React, { Component, Fragment } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import './app.css';

import Main from './components/Main';
import Upload from './components/Upload'
import Analytics from './components/Analytics'

class App extends Component {

    render() {
        return (
            <Router basename="/" history={history}>
                    <Switch>
                        <Route path='/' exact component={Main} />
                        <Route path='/upload' exact component={Upload} />
                        <Route path='/analytics' exact component={Analytics} />
                    </Switch>
            </Router>
        );
    }
}

export default App;
