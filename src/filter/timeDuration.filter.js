export default function timeDurationFilter(value) {
  return `${Math.trunc(value / 60)} ч ${value % 60} мин`
}