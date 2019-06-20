import React, {Component} from 'react';
import TableHeader from './tableHeader.js';
import TableRow from './tableRow.js';
import { connect } from 'react-redux';
import { setFilteredData, setDataStructure, sortFilteredData} from '../actions/rootActions.js'

import produce from "immer"

class TableControl extends Component {
  state = {
    filterInput: ''
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

  render() {
    if (this.props.data === undefined) return null;

    let b = [];
    this.props.data.map((row) => {
      this.props.filteredData.forEach((id) => {
        if (row['id'] === id) {b.push(row)}
      })
    })

    return (
      <div>
        <div>
          <input
            onChange = {(e) => this.onInputChange(e.target.value)}
            value={this.state.filterInput}
            onKeyPress={this.onEnter}
          />
        </div>
        <table>
          <thead>
            <TableHeader
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
    filteredData: store.filteredData
  }
}

const mapDispatchToProps = dispatch => ({
    setFilteredData: (filterInput) => {dispatch(setFilteredData(filterInput))},
    setDataStructure: (newArray) => {dispatch(setDataStructure(newArray))},
    sortFilteredData: (sortedData) => {dispatch(sortFilteredData(sortedData))}
})

export default connect(mapStateToProps, mapDispatchToProps) (TableControl);
