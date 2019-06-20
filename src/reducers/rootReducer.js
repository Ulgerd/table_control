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
        let newDataWithID = [...action.newData].map( (row) => {
          row["id"] = nanoid(6);
          return row;
        })
        draft.data = newDataWithID;
        draft.filteredData = filterArr(draft.data, '')
      })

    case 'SET_FILTERED_DATA':
      return produce(state, draft => {
        let filteredData = filterArr(draft.data, action.filterInput)
        draft.filteredData = filteredData;
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
        console.log(action.newVisibleColumns);
        draft.visibleColumns = {...action.newVisibleColumns};
      })

    case 'SET_NEW_CELL_VALUE':
      return produce(state, draft => {

        let newFilteredData = draft.data.map((row)=> {
          draft.checkedRows.forEach((id) => {
            if (row['id'] === id) {
              row[action.columnHeader] = action.newValue
              return row;
            }
          });
          return row;
        })

        draft.data = newFilteredData;

      })

    default:
      return state
  }
}
