import thunk from "redux-thunk";
import { bootstrap } from "redux-bootstrap";
import * as createLogger from "redux-logger";
import routes from "./config/routes";
import reposReducer from "./reducers/repos_reducer";
import usersReducer from "./reducers/users_reducer";
import "../style/site.scss";

declare var preloadedState: any;

let middleware: any[] = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

bootstrap({
    container: "root",
    initialState: preloadedState,
    middlewares: middleware,
    reducers: {
        repos: reposReducer,
        users: usersReducer
    },
    routes: routes
});
