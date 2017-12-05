import React from 'react';
import { Link } from 'react-router-dom';

function _fuzzyMatchItem(query, stringToMatch) {
    const queryWithoutSpaces = query.replace(/\s/g, '')
    const regexMatcher = new RegExp(query.split('').join('.*'), 'i')

    return stringToMatch.match(regexMatcher)
}

function _fuzzyMatchList(query, movieList) {
    return movieList.filter(movie => (
        _fuzzyMatchItem(query, movie.title)
    ))
}

export class MovieIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.state.query = ''
        this.state.didFetchMovies = false;

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
                <li key={movie.bomojo_id}>
                    <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </li>
            )
        })
        
        return (
            <div className="">
                <h2>Search</h2>
                <input 
                    type='text' 
                    onChange={this.onSearchInputChange} 
                    value={this.state.query} />

                <h2>Movies</h2>
                <ul className="">
                    {movieListItems}
                </ul>
            </div>
        );
    }
}

