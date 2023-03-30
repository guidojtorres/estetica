export function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function popValue(arr: any[], value: any) {
  return arr.filter((e) => e !== value);
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}
