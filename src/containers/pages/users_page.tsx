/// <reference path="../../interfaces/interfaces.d.ts" />

import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import userActions from "../../actions/user_actions";

function mapStateToPropsUserPage(state: any) {
    return { users: state.get("users") };
}

function mapDispatchToPropsUserPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(userActions, dispatch) };
}

@connect(mapStateToPropsUserPage, mapDispatchToPropsUserPage)
class UsersPage extends React.Component<any, any> {
    public render() {
        let label = "Loading...";
        if (this.props.users !== undefined && this.props.users.get("loading") === false) {
            label = this.props.users.get("usersCount");
        }
        return (
            <div>
                <div id="users_page_title">Users Page!</div>
                <div>
                    <p>User count: <span id="user_count">{label}</span></p>
                    <button id="add_user_btn" onClick={() => { this.props.actions.addUserAsync(); }}>Add User</button>
                </div>
            </div>
        );
    }
}

export default UsersPage;
