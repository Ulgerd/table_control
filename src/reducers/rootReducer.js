import produce from "immer";
import { changeCellValue } from "../utils/changeCellValue.js";

export const initialState = {
  data: undefined, // [{},{},{}]
  dataStructure: ['ID', 'Name', 'Value', 'Amount'],
  filteredData: [], // [id,id,id]
  checkedRows: [], // [id,id,id]
  visibleColumns: {'ID': true, 'Name': true, 'Value': true, 'Amount': true},
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_NEW_DATA':
      return produce(state, draft => {
        draft.data = action.data;
        draft.filteredData = action.filteredData;
      })

    case 'SET_FILTERED_DATA':
      return produce(state, draft => {
        draft.filteredData = action.filteredData
      })

    case 'SET_CHECKED_ROWS':
      return produce(state, draft => {
        draft.checkedRows = action.checkedRows;
      })

    case 'SET_DATA_STRUCTURE':
      return produce(state, draft => {
        draft.dataStructure = action.newArray;
      })

    case 'SORT_FILTERED_DATA':
      return produce(state, draft => {
        draft.data = [...action.sortedData];
      })

    case 'SET_VISIBLE_COLUMNS':
      return produce(state, draft => {
        draft.visibleColumns = {...action.newVisibleColumns};
      })

    case 'SET_NEW_CELL_VALUE':
      return produce(state, draft => {
        draft.data = changeCellValue(draft.data, draft.checkedRows, action.columnHeader, action.newValue)
      })

    default:
      return state
  }
}
