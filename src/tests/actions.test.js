import * as actions from "../actions/rootActions.js"
import * as types from "../actions/actionTypes.js"
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('actions tests', () => {
  it('SET_NEW_DATA should create an action', () => {
    let data = 'Finish docs'
    let expectedAction = {
      type: types.SET_NEW_DATA,
      data
    }
    expect(actions.setNewData(data)).toEqual(expectedAction)
  })

  it('SET_FILTERED_DATA should create an action', () => {
    let filteredData = 'Finish docs'
    let expectedAction = {
      type: types.SET_FILTERED_DATA,
      filteredData
    }
    expect(actions.setFilteredData(filteredData)).toEqual(expectedAction)
  })

  it('SET_CHECKED_ROWS should create an action', () => {
    let checkedRows = 'Finish docs'
    let expectedAction = {
      type: types.SET_CHECKED_ROWS,
      checkedRows
    }
    expect(actions.setCheckedRows(checkedRows)).toEqual(expectedAction)
  })

  it('SET_NEW_CELL_VALUE should create an action', () => {
    let columnHeader = 'Finish docs'
    let newValue = 'Bobby'
    let expectedAction = {
      type: types.SET_NEW_CELL_VALUE,
      columnHeader,
      newValue
    }
    expect(actions.setNewCellValue(columnHeader, newValue)).toEqual(expectedAction)
  })

  it('SET_DATA_STRUCTURE should create an action', () => {
    let newArray = 'Finish docs'
    let expectedAction = {
      type: types.SET_DATA_STRUCTURE,
      newArray,
    }
    expect(actions.setDataStructure(newArray)).toEqual(expectedAction)
  })

  it('SORT_FILTERED_DATA should create an action', () => {
    let sortedData = 'Finish docs'
    let expectedAction = {
      type: types.SORT_FILTERED_DATA,
      sortedData,
    }
    expect(actions.sortFilteredData(sortedData)).toEqual(expectedAction)
  })

  it('SET_VISIBLE_COLUMNS should create an action', () => {
    let newVisibleColumns = 'Finish docs'
    let expectedAction = {
      type: types.SET_VISIBLE_COLUMNS,
      newVisibleColumns,
    }
    expect(actions.setVisibleColumns(newVisibleColumns)).toEqual(expectedAction)
  })
})
