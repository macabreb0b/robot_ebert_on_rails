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
import BoxOfficeTimelineContainer from './box_office_timeline_container';
import { AuthRoute } from '../util/route_util';
import SessionFormContainer from './session_form_container';

const App = () => (
    <div className="main main--with-fixed-header">
        <div className="header--fixed">
            <div className="wrapper">
                <header className='u-flex u-flexAlignItemsCenter'>
                    <div className='FlexItem'>
                        <div className='flex_content'>
                            <Link to="/">
                                <h1>Robot Ebert</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='FlexItem'>
                        <div className='flex_content'>
                            <NavLink
                                exact
                                activeClassName='active'
                                className='top-nav_item'
                                to="/">
                                ALL
                            </NavLink>
                        </div>
                    </div>
                    <div className='FlexItem'>
                        <div className='flex_content'>
                            <NavLink
                                activeClassName='active'
                                className='top-nav_item'
                                to="/timeline">
                                TIMELINE
                            </NavLink>
                        </div>
                    </div>
                </header>
            </div>
        </div>

        <Switch>
            <AuthRoute exact path="/login" component={SessionFormContainer} />
            <AuthRoute exact path="/signup" component={SessionFormContainer} />
            <Route exact path="/" component={MovieIndexContainer} />
            <Route path="/movies/:movieId" component={MovieShowContainer} />
            <Route path="/timeline" component={BoxOfficeTimelineContainer} />
        </Switch>
    </div>
);

export default App;