/// <reference path="../../interfaces/interfaces.d.ts" />

import { Link } from "react-router";

class AppLayout extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <div>
                    <Link id="link_to_home" className="link_to" to="/">Home</Link>
                    <Link id="link_to_users" className="link_to" to="/users">Users</Link>
                    <Link id="link_to_repos" className="link_to" to="/repos">Repos</Link>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default AppLayout;