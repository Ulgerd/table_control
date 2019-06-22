export const sortColumns = (data, columnName) => {
  return data.sort((a, b) => {
    return (a[columnName] > b[columnName]) ? 1 : -1
  })
}
