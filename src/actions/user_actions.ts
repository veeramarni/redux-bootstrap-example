/// <reference path="../interfaces/interfaces.d.ts" />

import { makeActionCreator } from "../utils/utils";
import ACTION_TYPES from "../constants/action_types";

let addUserBegin = makeActionCreator(ACTION_TYPES.ADD_USER_BEGIN);
let addUserSuccess = makeActionCreator(ACTION_TYPES.ADD_USER_SUCCESS);

let addUserAsync =  () => {
    return (dispatch: Redux.Dispatch) => {
        dispatch(addUserBegin());
        setTimeout(() => { dispatch(addUserSuccess()); }, 20); // fake delay
    };
};

let userActions = {
    addUserAsync
};

export default userActions;
