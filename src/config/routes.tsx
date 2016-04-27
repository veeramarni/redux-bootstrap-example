/// <reference path="../interfaces/interfaces.d.ts" />

import * as React from "react";
import { IndexRoute, Route } from "react-router";
import AppLayout from "../containers/layout/layout";
import HomePage from "../containers/pages/home_page";
import UsersPage from "../containers/pages/users_page";
import ReposPage from "../containers/pages/repos_page";

let routes = (
    <Route path="/" component={AppLayout}>
        <IndexRoute component={HomePage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/repos" component={ReposPage} />
    </Route>
);

export default routes;
