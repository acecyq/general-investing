import format from "date-fns/format";

const dateString = format(new Date(), "do MMM u");
export function dateToString() {
  return dateString;
}

export function formatLabel(date) {
  return format(date, "do MMM yy");
}

export function formatMonthlyLabel(date) {
  return format(date, "MMM yy");
}
