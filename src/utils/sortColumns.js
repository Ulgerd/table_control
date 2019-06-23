export const sortColumns = (data, columnName) => {
  return data.sort((a, b) => {
    return (a[columnName] === undefined) ?
    1 :
    (a[columnName] > b[columnName]) ?
    1 :
    -1
  })
}
