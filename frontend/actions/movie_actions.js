import * as APIUtil from '../util/movie_api_util';

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export const RECEIVE_MOVIE = 'RECEIVE_MOVIE';
export const DID_FETCH_MOVIES = 'DID_FETCH_MOVIES';

export const receiveMovies = movies => ({
    type: RECEIVE_MOVIES,
    movies
});

export const receiveMovie = movie => ({
    type: RECEIVE_MOVIE,
    movie
});

export const didFetchMovies = () => ({
    type: DID_FETCH_MOVIES,
})

export const fetchMovies = filters => dispatch => {
    dispatch(didFetchMovies);
    return APIUtil.fetchMovies(filters).then(movies => {
        return dispatch(receiveMovies(movies));
    });
};

export const fetchMovie = id => dispatch => (
    APIUtil.fetchMovie(id).then(movie => (
        dispatch(receiveMovie(movie))
    ))
);

export const markMovieAsFavorite = movieId => dispatch => (
    APIUtil.markMovieAsFavorite(movieId).then(movie => (
        dispatch(receiveMovie(movie))
    ))
);

export const markMovieAsViewed = movieId => dispatch => (
    APIUtil.markMovieAsViewed(movieId).then(movie => (
        dispatch(receiveMovie(movie))
    ))
);

export const markMovieAsNotFavorite = movieId => dispatch => (
    APIUtil.markMovieAsNotFavorite(movieId).then(movie => (
        dispatch(receiveMovie(movie))
    ))
);

export const markMovieAsNotViewed = movieId => dispatch => (
    APIUtil.markMovieAsNotViewed(movieId).then(movie => (
        dispatch(receiveMovie(movie))
    ))
);