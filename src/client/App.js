import React, { Component, Fragment } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import './app.css';

import Main from './components/Main';

class App extends Component {

    render() {
        return (
            <Router basename="/" history={history}>
                    <Switch>
                        <Route path='/' exact component={Main} />
                    </Switch>
            </Router>
        );
    }
}

export default App;
