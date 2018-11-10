import React from 'react';
import {
    Link,
    NavLink,
} from 'react-router-dom';
import { _renderIconBookmarked, _renderIconSeenIt } from '../util/helpers'

class Header extends React.Component {

    postSignOut() {
        console.log('postSignOut')
    }

    render() {
        const { currentUserId } = this.props;
        return (
            <div className="header--fixed">
                <div className="wrapper">
                    { currentUserId ? (
                            <button onClick={this.postSignOut}>sign out</button>
                        ) : (
                            <div>
                                <a href="/users/sign_in">sign in</a>{' '}
                                <a href="/users/sign_up">sign up</a>
                            </div>
                        )
                    }

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

                        <div className='FlexItem'>
                            <div className='flex_content'>
                                <NavLink
                                    activeClassName='active'
                                    className='top-nav_item'
                                    to="/starred">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                </NavLink>
                            </div>
                        </div>

                        <div className='FlexItem'>
                            <div className='flex_content'>
                                <NavLink
                                    activeClassName='active'
                                    className='top-nav_item'
                                    to="/watched">
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </NavLink>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        )
    }
}

export default Header;