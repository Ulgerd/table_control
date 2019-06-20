import nanoid from 'nanoid';
import produce from "immer";

export const initialState = {
  data: undefined,
  dataStructure: ['ID', 'Name', 'Value', 'Amount'],
  filteredData: undefined, // [{},{},{}]
  checkedRows: [], // массив ID кликнутых элементов
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
        draft.filteredData = newDataWithID;
      })

    case 'SET_FILTERED_DATA':
      return produce(state, draft => {
        draft.filteredData = action.filteredData;
      })

    case 'SET_CHECKED_ROWS':
      return produce(state, draft => {
        draft.checkedRows = action.checkedRows;
      })

    case 'SET_NEW_CELL_VALUE':
      return produce(state, draft => {
        // console.log(state.filteredData);

        let newFilteredData = [...draft.data].map((row)=> {

          let a = draft.checkedRows.map((id) => {
            if (row['id'] === id) {
              row[action.columnHeader] = action.newValue
              return row;
            }
            return row;
          })

          return a[0]
        })

        draft.data = newFilteredData;

      })

    default:
      return state
  }
}
