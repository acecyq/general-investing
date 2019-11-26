import format from "date-fns/format";

const dateString = format(new Date(), "do MMM u");
export function dateToString() {
  return dateString;
}

export function formatLabel(dateString) {
  const dateArray = dateString.split("-").map((att, index) => {
    return index > 0 ? Number(att) - 1 : Number(att);
  });
  const date = new Date(...dateArray);
  return format(date, "do MMM yy");
}

export function formatMonthlyLabel(date) {
  return format(date, "MMM yy");
}
