export default function currencyFilter(value, currency = 'RUB') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    useGrouping: false,
    minimumFractionDigits: 0
  }).format(value)
}