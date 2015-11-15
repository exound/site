import createBrowserHistory from "history/lib/createBrowserHistory";
import useScroll from "scroll-behavior/lib/useStandardScroll";

const history = useScroll(createBrowserHistory)();

export default history;
