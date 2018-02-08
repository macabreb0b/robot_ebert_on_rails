import React from 'react';
import { Link } from 'react-router-dom';
import { _renderIconBookmarked, _renderIconSeenIt } from '../util/helpers'
import { Redirect } from 'react-router';



export function _renderIconBookmarked(isBookmarked) {
    return
}

export class MovieListItem extends React.Component {
    constructor(props) {
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        this.setState({redirect: true})
    }

    render() {
        return this.props.isFavorited ? (
            <div className='chunky-icon' title="Click to remove from Favorites">
                <i className="fa fa-star" aria-hidden="true"></i>
            </div>
        ) : (
            <div className='chunky-icon' title="Click to add to Favorites">
                <i className="fa fa-star-o" aria-hidden="true"></i>
            </div>
        )
    }
}
