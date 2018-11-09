import React from 'react';
import { Link } from 'react-router-dom';
import { _renderIconBookmarked, _renderIconSeenIt } from '../util/helpers'
import { Redirect } from 'react-router';

function _renderBestBoxOfficeRanks(movie) {
    let ranks = [];
    if (movie.box_office_data.best_rank) {
        ranks = new Array(1)
            .fill(movie.box_office_data.best_rank);
    }
    const renderedRanks = ranks.map((rank, idx) => (
        <span key={idx} className={`rank rank--${rank}`}>{'#' + rank}</span>
    ))
    if (ranks.length) {
        return (
            <span className='ranks show-tooltip'>
                <span className='tooltip tooltip--left'>
                    {`best box office rank - ${movie.box_office_data.days_at_best_rank} days at #${movie.box_office_data.best_rank}`}
                </span>
                {renderedRanks}
            </span>
        )
    } else {
        return null
    }
}

export class MovieListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }

        this.handleClickListItem = this.handleClickListItem.bind(this);
        this.handleClickFavorite = this.handleClickFavorite.bind(this);
        this.handleClickViewed = this.handleClickViewed.bind(this);
    }

    handleClickListItem(event) {
        this.setState({ redirect: true })
    }

    handleClickFavorite(event) {
        event.stopPropagation();

        if (this.props.movie.is_favorited) {
            this.props.markMovieAsNotFavorite(this.props.movie.id);
        } else {
            this.props.markMovieAsFavorite(this.props.movie.id);
        }
    }

    handleClickViewed(event) {
        event.stopPropagation();

        if (this.props.movie.is_viewed) {
            this.props.markMovieAsNotViewed(this.props.movie.id);
        } else {
            this.props.markMovieAsViewed(this.props.movie.id);
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect push to={`/movies/${this.props.movie.id}`} />)
        }
        return (
            <div
                className='movie-list-card u-flex u-flexRow u-flexAlignItemsCenter u-pseudolink'
                key={this.props.movie.bomojo_id}
                onClick={this.handleClickListItem}
            >
                <div className='FlexItem u-flexExpandRight'>
                    <div
                        className='movie-list-card_title'
                    >
                        <Link to={`/movies/${this.props.movie.id}`}>
                            {this.props.movie.title}
                        </Link>
                    </div>
                </div>
                <div className='FlexItem'>
                    <div className='u-flex u-flexCol u-flexAlignItemsCenter'>
                        <div
                            className='FlexItem'
                            onClick={this.handleClickFavorite}
                        >
                            {_renderIconBookmarked(this.props.movie.is_favorited)}
                        </div>
                        <div
                            className='FlexItem'
                            onClick={this.handleClickViewed}
                        >
                            {_renderIconSeenIt(this.props.movie.is_viewed)}
                        </div>

                        <div className='FlexItem'>
                            <div className='rank-container'>
                                {_renderBestBoxOfficeRanks(this.props.movie)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
