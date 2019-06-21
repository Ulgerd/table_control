import React, {Component} from 'react';
import TableHeader from './tableHeader.js';
import TableRow from './tableRow.js';
import { connect } from 'react-redux';
import { setFilteredData, setDataStructure, sortFilteredData, setVisibleColumns} from '../actions/rootActions.js'

import produce from "immer"

class TableControl extends Component {
  state = {
    filterInput: '',
    visibilityListOpen: false,
  };

  onSortColumn = (columnName) => {
    let newData = this.props.data.sort((a, b) => {
      return (a[columnName] > b[columnName]) ? 1 : -1
    })
    this.props.sortFilteredData(newData)
  }

  onInputChange = (filter) => {
    this.setState({...this.state, filterInput: filter})
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.setFilteredData(this.state.filterInput)
    }
  }

  onColumnVisibilityCheck = (e) => {
    let newVisibleColumns = {...this.props.visibleColumns}
    newVisibleColumns[e.target.value] = !newVisibleColumns[e.target.value]
    this.props.setVisibleColumns(newVisibleColumns)
  }

  render() {
    if (this.props.data === undefined) return null;

    let b = [];
    this.props.data.map((row) => {
      this.props.filteredData.forEach((id) => {
        if (row['id'] === id) {b.push(row)}
      })
    })

    console.log(this.props.filteredData);
    return (
      <div>
        <div>
          { this.state.visibilityListOpen ?
            <div>
              <ul>
                {this.props.dataStructure.map((columnHeader) => {
                  return <li key={columnHeader}>
                    <input
                      type="checkbox"
                      value = {columnHeader}
                      onChange={this.onColumnVisibilityCheck}
                      defaultChecked={true}
                    />
                    {columnHeader}
                  </li>
                })}
              </ul>
              <button
                onClick = {() => this.setState({visibilityListOpen: false})}
              >
                Submit
              </button>
            </div>

            :
            <button
              onClick={() => this.setState({visibilityListOpen: true})}
            >
              Visibility
            </button>
          }
          <input
            onChange = {(e) => this.onInputChange(e.target.value)}
            value={this.state.filterInput}
            onKeyPress={this.onEnter}
          />
        </div>
        <table>
          <thead>
            <TableHeader
              visibleColumns={this.props.visibleColumns}
              dataStructure={this.props.dataStructure}
              onDataStructureChange = {(newArray) => this.props.setDataStructure(newArray)}
              onSortColumn = {this.onSortColumn}
            />
          </thead>
          <tbody>
            {
              b.map((row) => {
                return <TableRow
                  key={row['id']}
                  data = {row}
                  dataStructure={this.props.dataStructure}
                  visibleColumns={this.props.visibleColumns}
                  />
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    data: store.data,
    dataStructure: store.dataStructure,
    filteredData: store.filteredData,
    visibleColumns: store.visibleColumns,
  }
}

const mapDispatchToProps = dispatch => ({
    setFilteredData: (filterInput) => {dispatch(setFilteredData(filterInput))},
    setDataStructure: (newArray) => {dispatch(setDataStructure(newArray))},
    sortFilteredData: (sortedData) => {dispatch(sortFilteredData(sortedData))},
    setVisibleColumns: (newVisibleColumns) => {dispatch(setVisibleColumns(newVisibleColumns))},
})

export default connect(mapStateToProps, mapDispatchToProps) (TableControl);
