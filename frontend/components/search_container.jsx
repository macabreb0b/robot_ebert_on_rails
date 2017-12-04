import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movie_actions';
import { asSortedArray } from '../reducers/selectors';
import Search from './search';

const mapStateToProps = (state, {  }) => {
    return {
        movies: asSortedArray(state)
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMovies: id => dispatch(fetchMovies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);