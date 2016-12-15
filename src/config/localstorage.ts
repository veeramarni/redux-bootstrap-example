import { throttle } from "lodash";

function loadState() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

function unprotectedSaveState(state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        // Ignore write errors
    }
}

let saveState = throttle(unprotectedSaveState, 1000);

export { loadState, saveState };
