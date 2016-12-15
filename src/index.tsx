import thunk from "redux-thunk";
import { bootstrap } from "redux-bootstrap";
import * as createLogger from "redux-logger";
import routes from "./config/routes";
import reposReducer from "./reducers/repos_reducer";
import usersReducer from "./reducers/users_reducer";
import { loadState, saveState } from "./config/localstorage";
import "../style/site.scss";

declare var __PRELOADED_STATE__: any;

let middleware: any[] = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

let preloadedState: any = null;

if (typeof __PRELOADED_STATE__ === "undefined") {
    preloadedState = loadState();
} else {
    preloadedState = __PRELOADED_STATE__;
}

let result = bootstrap({
    container: "root",
    initialState: preloadedState,
    middlewares: middleware,
    reducers: {
        repos: reposReducer,
        users: usersReducer
    },
    routes: routes
});

result.store.subscribe(() => {
    saveState(result.store.getState());
});
