import React from 'react';
import { Link } from 'react-router-dom';
import { _renderIconBookmarked, _renderIconSeenIt } from '../util/helpers'

function _fuzzyMatchItem(query, stringToMatch) {
    const regexSafeQuery = query.replace(/[^A-Za-z0-9]/g, '')
    const regexMatcher = new RegExp(regexSafeQuery.split('').join('.*'), 'i')

    return stringToMatch.match(regexMatcher)
}

function _fuzzyMatchList(query, movieList) {
    return movieList.filter(movie => (
        _fuzzyMatchItem(query, movie.title)
    ))
}

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
                <span className='tooltip'>
                    {`best box office rank - ${movie.box_office_data.days_at_best_rank} days at #${movie.box_office_data.best_rank}`}
                </span>
                {renderedRanks}
            </span>
        )
    } else {
        return null
    }
}

export class MovieIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.state.query = ''
        this.state.didFetchMovies = this.props.didFetchMovies;

        this.onSearchInputChange = this.onSearchInputChange.bind(this)
    }

    componentDidMount() {
        if (!this.state.didFetchMovies) {
            this.props.fetchMovies();
            this.setState({
                didFetchMovies: true
            })
        }
    }

    onSearchInputChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    render() {
        const matchedMovies = _fuzzyMatchList(this.state.query, this.props.movies);
        const movieListItems = matchedMovies.map((movie) => {
            return (
                <div className='movie-list-card u-flex u-flexRow u-flexAlignItemsCenter' key={movie.bomojo_id}>
                    <div className='FlexItem u-flexExpandRight'>
                        <div className='movie-list-card_title'>
                            <Link to={`/movies/${movie.id}`}>
                                {movie.title}
                            </Link>
                        </div>
                    </div>
                    <div className='FlexItem'>
                        <div className='u-flex u-flexCol u-flexAlignItemsCenter'>

                            <div className='FlexItem'>
                                <div className='u-flex u-flexRow u-flexJustifyAround'>
                                    <div className='FlexItem'>
                                        {_renderIconSeenIt(false)}
                                    </div>
                                    <div className='FlexItem'>
                                        {_renderIconBookmarked(false)}
                                    </div>
                                </div>
                            </div>

                            <div className='FlexItem u-flexExpand'>
                                <div className='rank-container'>
                                    {_renderBestBoxOfficeRanks(movie)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="wrapper">
                <h2>Recent Movies</h2>
                <input
                    type='text'
                    placeholder='Type here to filter movie list'
                    onChange={this.onSearchInputChange}
                    value={this.state.query}
                    className='filter-movies_input'/>

                <div className='movie-list'>
                    {movieListItems}
                </div>
            </div>
        );
    }
}

