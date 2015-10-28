import moment from "moment";

export function slashFormat(src) {
  return moment(src).format("YYYY/MM/DD");
}
