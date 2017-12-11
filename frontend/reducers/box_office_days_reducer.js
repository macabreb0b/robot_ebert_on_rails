import merge from 'lodash/merge';

import {
    RECEIVE_TIMELINE,
} from '../actions/box_office_day_actions';

const boxOfficeDaysReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);

    switch(action.type) {
        case RECEIVE_TIMELINE:
            const boxOfficeDays = action.boxOfficeDays;
            const boxOfficeDaysById = {};
            boxOfficeDays.forEach(boxOfficeDay => {
                boxOfficeDaysById[boxOfficeDay.id] = boxOfficeDay;
            })
            return merge({}, state, boxOfficeDaysById)
        default:
            return state;
    }
}

export default boxOfficeDaysReducer