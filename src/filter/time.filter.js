export default function timeFilter(value) {
  const time = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(Date.parse(value)))

  return time
}