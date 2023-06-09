import { UserState, UserAction, UserActionTypes } from '../actions/types';

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
}

const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.GET_USERS_REQUEST:
        case UserActionTypes.DELETE_USER_REQUEST:
            return {...state, loading: true, error: null};
        case UserActionTypes.GET_USERS_SUCCESS:
            return { ...state, users: action.payload, loading: false, error: null };
        case UserActionTypes.GET_USERS_FAILURE:
        case UserActionTypes.DELETE_USER_FAILURE:
            return {...state, loading: false, error: action.payload };
        case UserActionTypes.DELETE_USER_SUCCESS:
        return {
            ...state,
            users: state.users.filter((user) => user.id !== action.payload),
            loading: false,
            error: null,
        };
        default:
            return state;
    }
}

export default userReducer;