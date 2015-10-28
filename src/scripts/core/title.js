import R from "ramda";

export default function title(...args) {
  return R.join(" - ", R.concat(R.filter(arg => !R.isNil(arg), args), [
    "人人都来玩音乐", "叉烧网"
  ]));
}
