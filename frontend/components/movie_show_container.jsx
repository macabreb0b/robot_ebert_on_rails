import { connect } from 'react-redux';

import { fetchMovie } from '../actions/movie_actions';
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
  fetchMovie: id => dispatch(fetchMovie(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieShow);