interface IBtnProps {
    textLabel: string;
    clickHandler: () => any;
}

interface ICounterProps {
    count: string;
    addBtnTextLabel: string;
    incrementAsync: () => any;
}
