import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    NavLink,
    HashRouter
} from 'react-router-dom';

import HeaderContainer from './header_container';
import MovieShowContainer from './movie_show_container';
import MovieIndexContainer from './movie_index_container';
import BoxOfficeTimelineContainer from './box_office_timeline_container'

class App extends React.Component {
    render() {
        return (
            <div className="main main--with-fixed-header">

                <HeaderContainer />

                <Switch>
                    <Route exact path="/" component={MovieIndexContainer} />
                    <Route path="/movies/:movieId" component={MovieShowContainer} />
                    <Route path="/timeline" component={BoxOfficeTimelineContainer} />
                </Switch>
            </div>
        )
    }
};

export default App;