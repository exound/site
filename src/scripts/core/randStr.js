import R from "ramda";

export default function randStr() {
  return R.slice(
    0,
    8,
    parseInt(((Math.random() * 9 + 1)).toString().replace(".", "")).toString(16)
  );
};
