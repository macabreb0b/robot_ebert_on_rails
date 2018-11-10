import { connect } from 'react-redux';

import { sortMoviesByReleaseDate, userViewedMovies } from '../reducers/selectors';
import { fetchMovies } from '../actions/movie_actions';
import ViewedMovies from './viewed_movies';

const mapStateToProps = (state) => {
    const movies = sortMoviesByReleaseDate(
        userViewedMovies(state)
    );

    return {
        movies,
        didFetchMovies: state.ui.didFetchMovies
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMovies: id => dispatch(fetchMovies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewedMovies);