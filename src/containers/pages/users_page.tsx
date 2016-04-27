/// <reference path="../../interfaces/interfaces.d.ts" />

import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import userActions from "../../actions/user_actions";
import Counter from "../../components/counter_component";

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
                <div>Users Page!</div>
                <br />
                <Counter count={label}
                         addBtnTextLabel={"Add User"}
                         incrementAsync={() => { this.props.actions.addUserAsync(); } } />
            </div>
        );
    }
}

export default UsersPage;
