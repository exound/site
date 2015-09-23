import R from "ramda";
import co from "co";
import feq from "./feq";

export default function getData({
  resolve,
  callbacks,
  staticProps
} = {
  resolve: {},
  callbacks: [],
  staticProps: {}
}) {
  return co(function* () {
    const data = yield R.mapObj(url => feq.get(url).then(res => res.body), resolve);

    return R.compose(...R.append(R.identity, callbacks))(R.merge(staticProps, data));
  });
}
