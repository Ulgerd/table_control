import React, {Component} from 'react';
import TableDataCell from './tableDataCell.js';
import { connect } from 'react-redux';
import { setCheckedRows, setNewCellValue, cloneRow, deleteRow } from '../actions/rootActions.js'

class TableRow extends Component {

  onClick = (e) => {
    if (e.shiftKey) {
      this.props.setCheckedRows([...this.props.checkedRows, this.props.data['id']])
    } else {
      this.props.setCheckedRows([this.props.data['id']])
    }
  }

  render() {
    let checked = this.props.checkedRows.some( (id) => {
      return id === this.props.data['id'];
    })
    return (
      <tr
        className= {checked ? "row_checked" : "row"}
      >
          {this.props.dataStructure.map((columnHeader)=> {
          if (this.props.visibleColumns[columnHeader]) {
            return <TableDataCell //свой ключ каждому
              rowID = {this.props.data['id']}
              oneClick = {this.onClick}
              onCloneRow = {this.props.cloneRow}
              onDeleteRow = {this.props.deleteRow}
              setNewCellValue = {this.props.setNewCellValue}
              columnHeader={columnHeader}
              cellData = {this.props.data[columnHeader]}
            />
          }
        }
          )}
      </tr>
    )
  }
}

const mapStateToProps = store => {
  return {
    checkedRows: store.checkedRows
  }
}

const mapDispatchToProps = dispatch => ({
    setCheckedRows: (checkedRows) => {dispatch(setCheckedRows(checkedRows))},
    setNewCellValue: (columnHeader, newValue) => {dispatch(setNewCellValue(columnHeader, newValue))},
    cloneRow: (rowID) => {dispatch(cloneRow(rowID))},
    deleteRow: (rowID) => {dispatch(deleteRow(rowID))},
})

export default connect(mapStateToProps, mapDispatchToProps) (TableRow);
