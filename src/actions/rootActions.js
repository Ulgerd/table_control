import { SET_NEW_DATA, SET_FILTERED_DATA, SET_CHECKED_ROWS, SET_NEW_CELL_VALUE } from './actionTypes';

export function setNewData(newData) {
  return {
    type: SET_NEW_DATA,
    newData
  }
}

export function setFilteredData(filteredData) {
  return {
    type: SET_FILTERED_DATA,
    filteredData
  }
}

export function setCheckedRows(checkedRows) {
  return {
    type: SET_CHECKED_ROWS,
    checkedRows
  }
}

export function setNewCellValue(columnHeader, newValue) { //rename multiple 
  return {
    type: SET_NEW_CELL_VALUE,
    columnHeader,
    newValue
  }
}
