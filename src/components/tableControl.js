import React, {Component} from 'react';
import TableHeader from './tableHeader.js';
import TableRow from './tableRow.js';
import { connect } from 'react-redux';
import { setFilteredData } from '../actions/rootActions.js'

import produce from "immer"

class TableControl extends Component {
  state = {
    data: this.props.data,
    dataStructure: ['ID', 'Name', 'Value', 'Amount'],
    filterInput: ''
  };

  onDataStructureChange = (newArray) => {
    this.setState({dataStructure: newArray})
  }

  onSortColumn = (columnName) => {
    let newData = this.state.data.sort((a, b) => {
      return (a[columnName] > b[columnName]) ? 1 : -1
    })
    this.setState({data: newData})
  }

  onInputChange = (filter) => {
    this.setState({...this.state, filterInput: filter})
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      let filteredData = this.props.data.filter((row) => {
        return Object.keys(row).some((value) => {
          if ((row[value]+'').search(this.state.filterInput) !== -1) {
            return true;
          }
        })
      })
      this.props.setFilteredData(filteredData)
    }
  }

  render() {
    if (this.props.data === undefined) return null;
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
              dataStructure={this.state.dataStructure}
              onDataStructureChange = {this.onDataStructureChange}
              onSortColumn = {this.onSortColumn}
            />
          </thead>
          <tbody>
            {this.props.filteredData.map((row) => { /// main Problem
              return <TableRow
                      data = {row}
                      dataStructure={this.state.dataStructure}
                     />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    data: store.data,
    filteredData: store.filteredData
  }
}

const mapDispatchToProps = dispatch => ({
    setFilteredData: (filteredData) => {dispatch(setFilteredData(filteredData))},
})

export default connect(mapStateToProps, mapDispatchToProps) (TableControl);
