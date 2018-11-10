import { connect } from 'react-redux';
import {
    markMovieAsFavorite,
    markMovieAsNotFavorite,
    markMovieAsViewed,
    markMovieAsNotViewed,
    fetchMovie,
} from '../actions/movie_actions';
import MovieShow from './movie_show';

const mapStateToProps = (state, { match }) => {
    const movieId = parseInt(match.params.movieId);
    const movie = state.movies[movieId] || {};
    return {
        movieId,
        movie
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMovie: id => dispatch(fetchMovie(id)),
    markMovieAsFavorite: id => dispatch(markMovieAsFavorite(id)),
    markMovieAsNotFavorite: id => dispatch(markMovieAsNotFavorite(id)),
    markMovieAsViewed: id => dispatch(markMovieAsViewed(id)),
    markMovieAsNotViewed: id => dispatch(markMovieAsNotViewed(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieShow);