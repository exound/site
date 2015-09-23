import R from "ramda";

export default function title(...args) {
  return R.join(" - ", R.concat(args, ["人人都来玩音乐", "叉烧网"]));
}
