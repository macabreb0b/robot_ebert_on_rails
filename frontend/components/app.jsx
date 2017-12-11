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

import MovieShowContainer from './movie_show_container';
import MovieIndexContainer from './movie_index_container';
import BoxOfficeTimelineContainer from './box_office_timeline_container'

const App = () => (
    <div className="">
        <div className="wrapper">
            <header className='u-flex u-flexAlignItemsCenter'>
                <div className='FlexItem'>
                    <div className='flex_content'>
                        <Link exact to="/">
                            <h1>Robot Ebert</h1>
                        </Link>
                    </div>
                </div>
                <div className='FlexItem'>
                    <div className='flex_content'>
                        <NavLink 
                            activeClassName='active' 
                            className='top-nav_item' 
                            to="/timeline">
                            box office timeline
                        </NavLink>
                    </div>
                </div>
            </header>
        </div>
        <Switch>
            <Route exact path="/" component={MovieIndexContainer} />
            <Route path="/movies/:movieId" component={MovieShowContainer} />
            <Route path="/timeline" component={BoxOfficeTimelineContainer} />
        </Switch>
    </div>
);

export default App;