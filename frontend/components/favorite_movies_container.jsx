import { connect } from 'react-redux';

import { sortMoviesByReleaseDate, userFavoriteMovies } from '../reducers/selectors';
import { fetchMovies } from '../actions/movie_actions';
import FavoriteMovies from './favorite_movies';

const mapStateToProps = (state) => {
    const movies = sortMoviesByReleaseDate(
        userFavoriteMovies(state)
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
)(FavoriteMovies);