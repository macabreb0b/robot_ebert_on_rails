import merge from 'lodash/merge';


import {
    DID_FETCH_MOVIES,
} from '../actions/movie_actions';

const uiReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);

    switch(action.type) {
        case DID_FETCH_MOVIES:
            newState.didFetchMovies = true
            return newState
        default:
            return state;
    }
}

export default uiReducer