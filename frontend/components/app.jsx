import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import MovieShowContainer from './movie_show_container';
import MovieIndexContainer from './movie_index_container';

const App = () => (
    <div className="wrapper">
        <header className="">
            <Link to="/">
                <h1>Robot Ebert</h1>
            </Link>
        </header>
        <Switch>
            <Route exact path="/" component={MovieIndexContainer} />
            <Route path="/movies/:movieId" component={MovieShowContainer} />
        </Switch>
    </div>
);

export default App;