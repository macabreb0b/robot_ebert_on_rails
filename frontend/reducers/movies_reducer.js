import merge from 'lodash/merge';

import {
    RECEIVE_MOVIE,
    RECEIVE_MOVIES,
} from '../actions/movie_actions';

const moviesReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);

    switch(action.type) {
        case RECEIVE_MOVIES:
            const moviesById = {};
            action.movies.forEach(function(movie) {
                moviesById[movie.id] = movie
            })
            return merge({}, state, moviesById)
        case RECEIVE_MOVIE:
            const movie = action.movie;
            return merge({}, state, { [movie.id]: movie });
        default:
            return state;
    }
}

export default moviesReducer