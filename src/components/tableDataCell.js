import React, {useState} from 'react';
import { connect } from 'react-redux';
import {
  setNewCellValue,
  setCheckedRows,
  cloneRow,
  deleteRow,
} from '../actions/rootActions.js'

import '../assets/CSS/tableDataCell.css';

function TableDataCell(props)  {

  const [editingData, setEditingData] = useState(false);
  const [inputValue, setInputValue] = useState(props.cellData);
  const [contextMenu, setContextMenu] = useState(false);

  var timer = null;

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      endEditing();
    }
  }

  const endEditing = () => {
    let flag = false;
    props.checkedRows.map ((id) => {
      if (props.rowID === id) {
        props.setNewCellValue(props.columnHeader, inputValue)
        flag = true;
      }
      return null;
    })
    if (!flag) {
      props.setCheckedRows([props.rowID])
      props.setNewCellValue(props.columnHeader, inputValue)
    }
    setEditingData(false)
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

  const onDoubleClick = (e) => {
    clearTimeout(timer);
    setEditingData(true)
  }

  return (
    <td
      onClick = {onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e)=> {e.preventDefault(); setContextMenu(!contextMenu)}}
      className={'dataCell'}
    >
      {contextMenu ?
        <ul className={'dropdown_open'} onClick={() => setContextMenu(false)}>
          <li
            className={'dropdownItem first_Item'}
            onClick ={()=> {props.cloneRow(props.rowID); setContextMenu(false)}}
          >
            Продублировать
          </li>
          <li
            className={'dropdownItem'}
            onClick ={(e)=> {e.stopPropagation(); setEditingData(true); setContextMenu(false)}}
          >
            Изменить
          </li>
          <li
            className={'dropdownItem last_Item'}
            onClick ={()=> {props.deleteRow(props.rowID); setContextMenu(false)}}
          >
            Удалить
          </li>
        </ul> :
        <div></div>}

        {contextMenu ?
          <div
            className ='dropdown_background'
            onClick ={()=> {setContextMenu(false)}}
          ></div>:
          <div></div>}

      {editingData ?
        <input
          className='cell_input'
          autoFocus
          onBlur = {endEditing}
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
