import merge from 'lodash/merge';


import {
    RECEIVE_MOVIES,
} from '../actions/movie_actions';

const uiReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);

    switch(action.type) {
        case RECEIVE_MOVIES:
            newState.didFetchMovies = true
            return newState
        default:
            return state;
    }
}

export default uiReducer