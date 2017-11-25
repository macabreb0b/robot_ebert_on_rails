import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
    componentDidMount() {
        if (!this.props.movies.length) {
            this.props.fetchMovies();
        }
    }
    
    render() {
        const movieListItems = this.props.movies.map((movie) => {
            return (
                <li key={movie.bomojo_id}>
                    <Link to={'/movies/' + movie.id}>
                        {movie.title}
                    </Link>
                </li>
            )
        })
        
        return (
            <div className="">
                <h2>Search</h2>
                TODO
                <h2>Movies</h2>
                <ul className="">
                    {movieListItems}
                </ul>
            </div>
        );
    }
}

export default Search;