export default function dateFilter(value) {
  const date = new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(Date.parse(value)))

  const weekday = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short'
  }).format(new Date(Date.parse(value)))

  return `${date} ${weekday}`
}