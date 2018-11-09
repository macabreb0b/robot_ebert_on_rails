import { connect } from 'react-redux';

import { MovieListItem } from './movie_list_item';
import {
    markMovieAsFavorite,
    markMovieAsNotFavorite,
    markMovieAsViewed,
    markMovieAsNotViewed,
} from '../actions/movie_actions';


const mapStateToProps = (state, { movie }) => {
    return {
        movie
    };
};

const mapDispatchToProps = dispatch => ({
    markMovieAsFavorite: id => dispatch(markMovieAsFavorite(id)),
    markMovieAsNotFavorite: id => dispatch(markMovieAsNotFavorite(id)),
    markMovieAsViewed: id => dispatch(markMovieAsViewed(id)),
    markMovieAsNotViewed: id => dispatch(markMovieAsNotViewed(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieListItem);
