/// <reference path="../interfaces/interfaces.d.ts" />

import * as Immutable from "immutable";
import ACTION_TYPES from "../constants/action_types";

const defaultReposState = Immutable.fromJS({
    loading: false,
    reposCount: 0
});

const reposReducer: Redux.Reducer = (previousState: any = defaultReposState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_REPO_BEGIN:
            return previousState.set("loading", true);
        case ACTION_TYPES.ADD_REPO_SUCCESS:
            return previousState.merge({
                loading: false,
                reposCount: (previousState.get("reposCount") + 1)
            });
        default:
            return previousState;
    }
};

export default reposReducer;
