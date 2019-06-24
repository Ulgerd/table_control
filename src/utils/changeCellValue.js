export const changeCellValue = (data, checkedRows, columnHeader, newValue) => {
  return data.map((row)=> {
    checkedRows.forEach((id) => {
      if (row['id'] === id) {
        row[columnHeader] = newValue
        return row;
      }
    });
    return row;
  })
}
