
/// <reference path="./interfaces/interfaces.d.ts" />

import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import bootstrap from "redux-bootstrap";
import routes from "./config/routes";
import reposReducer from "./reducers/repos_reducer";
import usersReducer from "./reducers/users_reducer";

bootstrap({
    container: "root",
    initialState: {},
    middlewares: [thunk, createLogger()],
    reducers: {
        reposReducer,
        usersReducer
    },
    routes: routes
});