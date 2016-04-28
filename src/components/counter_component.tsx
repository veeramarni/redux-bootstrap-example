import Btn from "./btn_component";
import * as React from "react";

class Counter extends React.Component<ICounterProps, any> {
    public render() {
        return (
            <div>
                <div className="count">
                    <span>{this.props.count}</span>
                </div>
                <Btn clickHandler={this.props.incrementAsync} textLabel={this.props.addBtnTextLabel} />
            </div>
        );
    }
}

export default Counter;
