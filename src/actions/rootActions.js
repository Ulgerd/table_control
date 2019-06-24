import {
  SET_NEW_DATA,
  SET_FILTERED_DATA,
  SET_CHECKED_ROWS,
  SET_NEW_CELL_VALUE,
  SET_DATA_STRUCTURE,
  SORT_FILTERED_DATA,
  SET_VISIBLE_COLUMNS,
} from './actionTypes';

export function setNewData(data, filteredData) {
  return {
    type: SET_NEW_DATA,
    data,
    filteredData
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

export function setVisibleColumns(newVisibleColumns) {
  return {
    type: SET_VISIBLE_COLUMNS,
    newVisibleColumns
  }
}

export function setNewCellValue(columnHeader, newValue) {
  return {
    type: SET_NEW_CELL_VALUE,
    columnHeader,
    newValue
  }
}
