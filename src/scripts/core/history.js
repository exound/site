import R from "ramda";
import createBrowserHistory from "history/lib/createBrowserHistory";
import useScroll from "scroll-behavior/lib/useStandardScroll";

const history = useScroll(createBrowserHistory)();

history.listenBefore(function(nextLocation, callback) {
  nextLocation.state = {previousPath: location.pathname};
  callback();
});

export default history;
