export function formatPriceWithComma(value: number) {
  return value
    ?.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    .replace(/\.00$/, '');
}
