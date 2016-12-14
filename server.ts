import * as express from "express";
import { createMemoryHistory } from "history";
import { renderToStaticMarkup } from "react-dom/server";
import { bootstrap } from "redux-bootstrap";
import routes from "./src/config/routes";
import reposReducer from "./src/reducers/repos_reducer";
import usersReducer from "./src/reducers/users_reducer";
import thunk from "redux-thunk";

function handleRender(req: express.Request, res: express.Response) {

    // TODO set preloadedState
    let preloadedState = {};

    let result = bootstrap({
        container: "root",
        createHistory: createMemoryHistory,
        initialState: preloadedState || {},
        middlewares: [thunk],
        reducers: {
            repos: reposReducer,
            users: usersReducer
        },
        render: () => { /*  skip first render, we navigate first */ },
        routes: routes
    });

    if (req.url.indexOf(".") === -1) {
        result.history.push(req.url);
    }

    result.output = renderToStaticMarkup(result.root);

    res.send(result.output);
}

const app = express();
const port = 3000;
app.use(handleRender);

app.listen(port);

console.log("Starting up http-server on: http:127.0.0.1:3000");
