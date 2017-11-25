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
import SearchContainer from './search_container';

const App = () => (
    <div className="wrapper">
        <header className="">
            <Link to="/">
                <h1>Robot Ebert</h1>
            </Link>
        </header>
        <Switch>
            <Route exact path="/" component={SearchContainer} />
            <Route path="/movies/:movieId" component={MovieShowContainer} />
        </Switch>
    </div>
);

export default App;