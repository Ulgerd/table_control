import React from 'react';
import TableDataCell from './tableDataCell.js';
import { connect } from 'react-redux';

function TableRow(props) {

  let checked = props.checkedRows.some((id) => {
    return id === props.rowData['id'];
  })

  return (
    <tr className={checked ? "row_checked": "row"}>
      {
        props.dataStructure.map((columnHeader) => {
          if (props.visibleColumns[columnHeader]) {
            return <TableDataCell
              key={props.rowData['id'] + props.rowData[columnHeader]}
              rowID={props.rowData['id']}
              columnHeader={columnHeader}
              cellData={props.rowData[columnHeader]}
            />
          }
          return null;
        })
      }
    </tr>
  )
}

const mapStateToProps = store => {
  return {
    checkedRows: store.checkedRows,
    dataStructure: store.dataStructure,
    visibleColumns: store.visibleColumns,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
