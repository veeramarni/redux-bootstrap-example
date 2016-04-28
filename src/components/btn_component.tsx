import * as React from "react";

class Btn extends React.Component<IBtnProps, any> {
    public render() {
        return (
            <button onClick={() => { this.props.clickHandler(); }}>
                {this.props.textLabel}
            </button>
        );
    }
}

export default Btn;
