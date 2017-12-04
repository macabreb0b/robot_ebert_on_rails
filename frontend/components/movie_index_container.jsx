import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movie_actions';
import { asSortedArray } from '../reducers/selectors';
import { MovieIndex, MovieTypeahead } from './movie_index';

const mapStateToProps = (state, {  }) => {
    const movies = asSortedArray(state)
    return {
        movies,
        movieTypeahead: new MovieTypeahead(movies),
        didFetchMovies: state.ui.didFetchMovies
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMovies: id => dispatch(fetchMovies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieIndex);