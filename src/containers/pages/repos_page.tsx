/// <reference path="../../interfaces/interfaces.d.ts" />

import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import repoActions from "../../actions/repo_actions";

function mapStateToPropsReposPage(state: any) {
    return { repos: state.get("repos") };
}

function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(repoActions, dispatch) };
}

@connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)
class ReposPage extends React.Component<any, any> {
    public render() {
        let label = "Loading...";
        if (this.props.repos !== undefined && this.props.repos.get("loading") === false) {
            label = this.props.repos.get("reposCount");
        }
        return (
            <div>
                <div id="repos_page_title">Repos Page!</div>
                <div>
                    <p>Repo count: <span id="repo_count">{label}</span></p>
                    <button id="add_repo_btn" onClick={() => { this.props.actions.addRepoAsync(); }}>Add Repo</button>
                </div>
            </div>
        );
    }
}

export default ReposPage;