import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movie_actions';
import { asArray } from '../reducers/selectors';
import Search from './search';

const mapStateToProps = (state, {  }) => {
    return {
        movies: asArray(state)
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMovies: id => dispatch(fetchMovies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);