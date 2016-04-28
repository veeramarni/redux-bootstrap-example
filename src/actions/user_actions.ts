import { makeActionCreator } from "../utils/utils";
import ACTION_TYPES from "../constants/action_types";

let addUserBegin = makeActionCreator(ACTION_TYPES.ADD_USER_BEGIN);
let addUserSuccess = makeActionCreator(ACTION_TYPES.ADD_USER_SUCCESS);

let addUserAsync =  () => {
    let random = Math.floor(Math.random() * 31) + 50;
    return (dispatch: Redux.Dispatch) => {
        dispatch(addUserBegin());
        setTimeout(() => { dispatch(addUserSuccess()); }, random); // fake delay
    };
};

let userActions = {
    addUserAsync
};

export default userActions;
