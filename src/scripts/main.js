import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

import Renderer from "./core/BrowserRenderer";
import history from "./core/history";
import resolveData from "./core/resolveData";

resolveData(location).then((data) => {
  Renderer.run({data, history});
});
