import React from 'react';
import MovieListItemContainer from './movie_list_item_container';

const MovieList = ({ movies }) => {
    return movies.length ? (
        <div className='movie-list'>
            {movies.map(movie => <MovieListItemContainer movie={movie} key={movie.id}/>)}
        </div>
    ) : "Nothing here..."
}

export default MovieList;