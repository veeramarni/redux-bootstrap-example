/// <refrence path="../../typings/browser.d.ts" />
/// <reference path="../../node_modules/redux-bootstrap/type_definitions/redux-bootstrap/redux-bootstrap.d.ts" />
/// <refrence path="../../node_modules/immutable/dist/immutable.d.ts" />

interface IBtnProps {
    textLabel: string;
    clickHandler: () => any;
}

interface ICounterProps {
    count: string;
    addBtnTextLabel: string;
    incrementAsync: () => any;
}
