import * as express from "express";
import { createMemoryHistory } from "history";
import { renderToStaticMarkup } from "react-dom/server";
import { bootstrap } from "redux-bootstrap";
import routes from "./src/config/routes";
import reposReducer from "./src/reducers/repos_reducer";
import usersReducer from "./src/reducers/users_reducer";
import thunk from "redux-thunk";
import * as sass from "node-sass";

function renderFullPage(css: string, html: string, preloadedState: any) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>redux-bootstrap example</title>
            <style>${css}</style>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
            </script>
            <script src="./dist/bundle.js"></script>
        </body>
        </html>
    `;
}

function getHandleRender(css: string) {
    return function handleRender(req: express.Request, res: express.Response, next: express.NextFunction) {

        // Ignote static assets
        if (req.url.indexOf(".") === -1) {

            // TODO set preloadedState
            let state = {};

            let result = bootstrap({
                container: "root",
                createHistory: createMemoryHistory,
                initialState: state,
                middlewares: [thunk],
                reducers: {
                    repos: reposReducer,
                    users: usersReducer
                },
                render: () => { /*  skip first render, we navigate first */ },
                routes: routes
            });

            result.history.push(req.url);

            let html = renderFullPage(
                css,
                renderToStaticMarkup(result.root),
                state
            );

            res.send(html);

        } else {
            next();
        }

    };
}

sass.render({
  file: "./style/site.scss"
}, (error, result) => {
    if (error !== undefined) {
        let handleRender = getHandleRender(result.css.toString("utf8"));
        let app = express();
        let port = 3000;
        app.use(handleRender);
        app.use("/dist", express.static("dist"));
        app.listen(port);
    }
});

console.log("Starting up http-server on: http:127.0.0.1:3000");
