export const filterArr = (data, filterInput) => {
  let newArr = [];
  data.forEach((row) => {
    if (
      Object.keys(row).some((value) => {
        return (value !== 'id' && (row[value] + '').search(filterInput) !== -1)
      }) === true
    ) newArr.push(row['id']);

  })
  return newArr;
}