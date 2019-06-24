import {rootReducer, initialState} from '../reducers/rootReducer.js'
import * as types from '../actions/actionTypes.js'

describe('reducer test', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({...initialState})
  })

  // it('should handle ADD_TODO', () => {
  //   expect(
  //     rootReducer([], {
  //       type: types.SET_FILTERED_DATA,
  //       filterInput: [{"ID": 0, "Name":"apple",  "Value":1.9, "Amount": 5, 'id': '123456'},
  //       {"ID": 1, "Name":"berry",  "Value":1.7, "Amount": 4, 'id': '654321'},]
  //     })
  //   ).toEqual([
  //     {
  //       data: undefined,
  //       dataStructure: ['ID', 'Name', 'Value', 'Amount'],
  //       filteredData: [],
  //       checkedRows: [],
  //       visibleColumns: {'ID': true, 'Name': true, 'Value': true, 'Amount': true},
  //     }
  //   ])
  // //
  //   expect(
  //     reducer(
  //       [
  //         {
  //           text: 'Use Redux',
  //           completed: false,
  //           id: 0
  //         }
  //       ],
  //       {
  //         type: types.ADD_TODO,
  //         text: 'Run the tests'
  //       }
  //     )
  //   ).toEqual([
  //     {
  //       text: 'Run the tests',
  //       completed: false,
  //       id: 1
  //     },
  //     {
  //       text: 'Use Redux',
  //       completed: false,
  //       id: 0
  //     }
  //   ])

  // })
})
