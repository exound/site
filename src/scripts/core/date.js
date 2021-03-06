import moment from "moment";

moment.locale("zh-cn");

export function slashFormat(src) {
  return moment(src).format("YYYY/MM/DD");
};

export function chinese(src) {
  return moment(src).format("LL");
};

export function fromNow(src) {
  return moment(src).fromNow();
};
