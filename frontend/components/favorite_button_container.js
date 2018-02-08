import { connect } from 'react-redux';

import { FavoriteButton } from './favorite_button';


const mapStateToProps = (state, { movie }) => {
    return {
        movie
    };
};

const mapDispatchToProps = dispatch => ({
    favoriteMovie: id => dispatch(favoriteMovie(id)),
    unFavoriteMovie: id => dispatch(unFavoriteMovie(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoriteButton);
