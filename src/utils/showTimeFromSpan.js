export default function showTimeFromSpan(span) {
  const date = new Date(span);

  const formated = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return formated;
}
