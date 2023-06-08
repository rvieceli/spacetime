export function format(
  date: Date | number | undefined,
  dateStyle: "medium" | "full" | "long" | "short" = "medium"
) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle,
  }).format(date);
}
