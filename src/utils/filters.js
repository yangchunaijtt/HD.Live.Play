
export const courseTypeFilter = value => {
  return {
    'pending': 'default',
    'late': 'danger',
    'leave': 'default'
  }[value]
}
