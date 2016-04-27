/// <reference path="../interfaces/interfaces.d.ts" />

import * as Immutable from "immutable";
import ACTION_TYPES from "../constants/action_types";

const defaultUsersState = Immutable.fromJS({
    loading: false,
    usersCount: 0
});

const usersReducer: Redux.Reducer = (previousState: any = defaultUsersState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER_BEGIN:
            return previousState.set("loading", true);
        case ACTION_TYPES.ADD_USER_SUCCESS:
            return previousState.merge({
                loading: false,
                usersCount: (previousState.get("usersCount") + 1)
            });
        default:
            return previousState;
    }
};

export default usersReducer;
