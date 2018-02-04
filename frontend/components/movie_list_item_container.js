import { connect } from 'react-redux';

import { MovieListItem } from './movie_list_item';


const mapStateToProps = (state, { movie }) => {
    return {
        movie
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieListItem);
