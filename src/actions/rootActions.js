import {
  SET_NEW_DATA,
  SET_FILTERED_DATA,
  SET_CHECKED_ROWS,
  SET_NEW_CELL_VALUE,
  SET_DATA_STRUCTURE,
  SORT_FILTERED_DATA
} from './actionTypes';

export function setNewData(newData) {
  return {
    type: SET_NEW_DATA,
    newData
  }
}

export function setFilteredData(filterInput) {
  return {
    type: SET_FILTERED_DATA,
    filterInput
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

export function setDataStructure(newArray) {
  return {
    type: SET_DATA_STRUCTURE,
    newArray
  }
}

export function sortFilteredData(sortedData) {
  return {
    type: SORT_FILTERED_DATA,
    sortedData
  }
}
