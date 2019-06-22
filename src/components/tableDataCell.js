import React, {useState} from 'react';
import { connect } from 'react-redux';
import {
  setNewCellValue,
  setCheckedRows,
  cloneRow,
  deleteRow,
} from '../actions/rootActions.js'

function TableDataCell(props)  {

  const [editingData, setEditingData] = useState(false);
  const [inputValue, setInputValue] = useState(props.cellData);
  const [contextMenu, setContextMenu] = useState(false);

  var timer = null;

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      props.setNewCellValue(props.columnHeader, inputValue)
      setEditingData(false)
    }
  }

  const onClick = (e) => {
    e.persist()
    clearTimeout(timer);
    timer = setTimeout(() => {
      singleClick(e)
    }, 250);
  }

  const singleClick = (e) => {
    if (e.shiftKey) {
      props.setCheckedRows([
        ...props.checkedRows,
        props.rowID
      ])
    } else {
      props.setCheckedRows([props.rowID])
    }
  }

  const onDoubleClick = () => {
    clearTimeout(timer);
    setEditingData(true)
  }

  return (
    <td
      onClick = {onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e)=> {e.preventDefault(); setContextMenu(true)}}
      className={'dataCell'}
    >
      {contextMenu ?
        <ul className={'dropdown'}>
          <li
            className={'dropdownItem'}
            onClick ={()=> {props.cloneRow(props.rowID); setContextMenu(false)}}
          >
            Продублировать
          </li>
          <li
            className={'dropdownItem'}
            onClick ={()=> {setEditingData(true); setContextMenu(false)}}
          >
            Изменить
          </li>
          <li
            className={'dropdownItem'}
            onClick ={()=> {props.deleteRow(props.rowID); setContextMenu(false)}}
          >
            Удалить
          </li>
        </ul> :
        null}

      {editingData ?
        <input
          autoFocus
          onChange ={(e) => setInputValue( e.target.value)}
          value={inputValue}
          onKeyPress={onEnter}
        /> :
        props.cellData}
    </td>
  )
}

const mapStateToProps = store => {
  return {
    checkedRows: store.checkedRows
  }
}

const mapDispatchToProps = dispatch => ({
  cloneRow: (rowID) => {dispatch(cloneRow(rowID))},
  deleteRow: (rowID) => {dispatch(deleteRow(rowID))},
  setNewCellValue: (columnHeader, newValue) => {dispatch(setNewCellValue(columnHeader, newValue))},
  setCheckedRows: (checkedRows) => {dispatch(setCheckedRows(checkedRows))},
})

export default connect(mapStateToProps, mapDispatchToProps)(TableDataCell);
