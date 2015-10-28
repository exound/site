import R from "ramda";
import co from "co";
import feq from "./feq";

function hookup(hooks, data) {
  return R.compose(...R.append(R.identity, hooks))(data);
}

export default function getData({
  resolve,
  preHooks,
  postHooks,
  staticProps
} = {
  resolve: {},
  prehooks: [],
  postHooks: [],
  staticProps: {}
}) {
  return co(function* () {
    const data = yield R.mapObj(
      url => feq.get(url).then(res => res.body),
      hookup(preHooks, resolve)
    );

    return hookup(postHooks, R.merge(staticProps, data));
  });
}
