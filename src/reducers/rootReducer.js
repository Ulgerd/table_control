import nanoid from 'nanoid';
import produce from "immer";
import { filterArr } from '../utils/filterArr.js'

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
        draft.data = [...action.newData].map( (row) => {
          row["id"] = nanoid(6);
          return row;
        })
        draft.filteredData = filterArr(draft.data, '')
      })

    case 'SET_FILTERED_DATA':
      return produce(state, draft => {
        draft.filteredData = filterArr(draft.data, action.filterInput)
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

    case 'CLONE_ROW':
      return produce(state, draft => {
        let newRow;
        draft.data.map((row)=> {
          if (row['id'] === action.rowID) {
            newRow = {...row}
            let newID = nanoid(6)
            newRow["id"] = newID;
            draft.filteredData = [...draft.filteredData, newID]
          }
          return null;
        })
        draft.data = [...draft.data, newRow]
      })

    case 'DELETE_ROW':
      return produce(state, draft => {
        draft.data.map((row, i)=> {
          if (row['id'] === action.rowID) {
            let tempArr = [...draft.data]
            tempArr.splice(i, 1)
            draft.data = tempArr
          }
          return null;
        })

        draft.filteredData.map((id, i)=> {
          if (id === action.rowID) {
            let tempArr = [...draft.filteredData]
            tempArr.splice(i, 1)
            draft.filteredData=tempArr
          }
          return null;
        })

      })

    case 'SET_NEW_CELL_VALUE':
      return produce(state, draft => {
        draft.data = draft.data.map((row)=> {
          draft.checkedRows.forEach((id) => {
            if (row['id'] === id) {
              row[action.columnHeader] = action.newValue
              return row;
            }
          });
          return row;
        })
      })

    default:
      return state
  }
}
