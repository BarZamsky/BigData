import React, { Component, Fragment } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import './app.css';

import Main from './components/Main';
import Upload from './components/Upload'

class App extends Component {

    render() {
        return (
            <Router basename="/" history={history}>
                    <Switch>
                        <Route path='/' exact component={Main} />
                        <Route path='/upload' exact component={Upload} />
                    </Switch>
            </Router>
        );
    }
}

export default App;
