import * as APIUtil from '../util/box_office_day_api_util'

import { receiveMovies } from './movie_actions';

export const RECEIVE_TIMELINE = 'RECEIVE_TIMELINE';

export const receiveTimeline = boxOfficeDays => ({
    type: RECEIVE_TIMELINE,
    boxOfficeDays
});

export const fetchTimeline = filters => dispatch => (
  APIUtil.fetchTimeline(filters).then(({ movies, box_office_days }) => {
    dispatch(receiveMovies(movies))
    return dispatch(receiveTimeline(box_office_days))
  })
);
