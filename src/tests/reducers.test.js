import {rootReducer, initialState} from '../reducers/rootReducer.js'
import * as types from '../actions/actionTypes.js'
import {cleanup} from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('reducer test', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      ...initialState
    })
  })

  it('should handle SET_NEW_DATA', () => {
    expect(rootReducer({}, {
      type: types.SET_NEW_DATA,
      data: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 1,
          "Name": "bar"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ],
      filteredData: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ]
    })).toEqual({
      data: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 1,
          "Name": "bar"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ],
      filteredData: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ]
    })
  })

  it('should handle SET_FILTERED_DATA', () => {
    expect(rootReducer({}, {
      type: types.SET_FILTERED_DATA,
      filteredData: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ]
    })).toEqual({
      filteredData: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ]
    })
  })

  it('should handle SET_CHECKED_ROWS', () => {
    expect(rootReducer({}, {
      type: types.SET_CHECKED_ROWS,
      checkedRows: ['123456', '654321', 'baz']
    })).toEqual({
      checkedRows: ['123456', '654321', 'baz']
    })
  })

  it('should handle SET_DATA_STRUCTURE', () => {
    expect(rootReducer({}, {
      type: types.SET_DATA_STRUCTURE,
      newArray: ['ID', 'Name', 'Value']
    })).toEqual({
      dataStructure: ['ID', 'Name', 'Value']
    })
  })

  it('should handle SORT_FILTERED_DATA', () => {
    expect(rootReducer({}, {
      type: types.SORT_FILTERED_DATA,
      sortedData: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ]
    })).toEqual({
      data: [
        {
          "ID": 0,
          "Name": "foo"
        }, {
          "ID": 2,
          "Name": "baz"
        }
      ]
    })
  })

  it('should handle SET_VISIBLE_COLUMNS', () => {
    expect(rootReducer({}, {
      type: types.SET_VISIBLE_COLUMNS,
      newVisibleColumns: {
        'ID': true,
        'Name': false,
        'Value': true,
        'Amount': true
      }
    })).toEqual({
      visibleColumns: {
        'ID': true,
        'Name': false,
        'Value': true,
        'Amount': true
      }
    })
  })

  it('should handle SET_NEW_CELL_VALUE', () => {
    expect(rootReducer({
      data: [
        {
          "id": 0,
          "Name": "foo"
        }, {
          "id": 1,
          "Name": "bar"
        }, {
          "id": 2,
          "Name": "baz"
        }
      ],
      checkedRows: [0, 2]
    }, {
      type: types.SET_NEW_CELL_VALUE,
      columnHeader: "Name",
      newValue: 'cat'
    })).toEqual({
      data: [
        {
          "id": 0,
          "Name": "cat"
        }, {
          "id": 1,
          "Name": "bar"
        }, {
          "id": 2,
          "Name": "cat"
        }
      ],
      checkedRows: [0, 2]
    })
  })

})
