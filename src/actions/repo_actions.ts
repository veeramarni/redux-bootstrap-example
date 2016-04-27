/// <reference path="../interfaces/interfaces.d.ts" />

import { makeActionCreator } from "../utils/utils";
import ACTION_TYPES from "../constants/action_types";

let addRepoBegin = makeActionCreator(ACTION_TYPES.ADD_REPO_BEGIN);
let addRepoSuccess = makeActionCreator(ACTION_TYPES.ADD_REPO_SUCCESS);

let addRepoAsync =  () => {
    return (dispatch: Redux.Dispatch) => {
        dispatch(addRepoBegin());
        setTimeout(() => { dispatch(addRepoSuccess()); }, 20); // fake delay
    };
};

let repoActions = { 
    addRepoAsync, 
    addRepoBegin, 
    addRepoSuccess 
};

export default repoActions;
