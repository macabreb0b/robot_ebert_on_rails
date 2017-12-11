import { connect } from 'react-redux';

import { fetchTimeline } from '../actions/box_office_day_actions';
import { asSortedArray } from '../reducers/selectors';
import BoxOfficeTimeline from './box_office_timeline';

const mapStateToProps = (state, {  }) => {
    const movies = state.movies
    const boxOfficeDays = state.boxOfficeDays
    return {
        movies,
        boxOfficeDays,
        didFetchTimeline: state.ui.didFetchTimeline
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTimeline: id => dispatch(fetchTimeline())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxOfficeTimeline);