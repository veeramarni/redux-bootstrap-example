/// <reference path="../interfaces/interfaces.d.ts" />

import Btn from "./btn_component";
import * as React from "react";

class Counter extends React.Component<ICounterProps, any> {
    public render() {
        return (
            <div>
                <p>
                    Total: <span id="user_count">{this.props.count}</span>
                </p>
                <Btn clickHandler={this.props.incrementAsync} textLabel={this.props.addBtnTextLabel} />
            </div>
        );
    }
}

export default Counter;
