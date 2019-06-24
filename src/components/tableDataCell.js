import React, {useState} from 'react';
import nanoid from 'nanoid';
import { connect } from 'react-redux';
import {changeCellValue} from '../utils/changeCellValue.js'
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

  const cloneRow = () => {
    let newRow, data, filteredData;
    props.data.map((row)=> {
      if (row['id'] === props.rowID) {
        newRow = {...row}
        let newID = nanoid(6)
        newRow["id"] = newID;
        filteredData = [...props.filteredData, newID]
      }
      return null;
    })
    data = [...props.data, newRow]
    props.cloneRow(data, filteredData);

    setContextMenu(false)
  }

  const deleteRow = () => {
    let data, filteredData;
    props.data.map((row, i)=> {
      if (row['id'] === props.rowID) {
        let tempArr = [...props.data]
        tempArr.splice(i, 1)
        data = tempArr;
      }
      return null;
    })

    props.filteredData.map((id, i)=> {
      if (id === props.rowID) {
        let tempArr = [...props.filteredData]
        tempArr.splice(i, 1)
        filteredData=tempArr
      }
      return null;
    })

    props.deleteRow(data, filteredData);
    setContextMenu(false)
  }

  const change = (e) => {
    e.stopPropagation();
    setEditingData(true);
    setContextMenu(false)
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
            onClick ={()=> cloneRow()}
          >
            Продублировать
          </li>
          <li
            className={'dropdownItem'}
            onClick ={(e)=> change(e)}
          >
            Изменить
          </li>
          <li
            className={'dropdownItem last_Item'}
            onClick ={()=> deleteRow()}
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
    data: store.data,
    filteredData: store.filteredData,
    checkedRows: store.checkedRows,
  }
}

const mapDispatchToProps = dispatch => ({
  cloneRow: (data, filteredData) => {dispatch(cloneRow(data, filteredData))},
  deleteRow: (data, filteredData) => {dispatch(deleteRow(data, filteredData))},
  setNewCellValue: (columnHeader, newValue) => {dispatch(setNewCellValue(columnHeader, newValue))},
  setCheckedRows: (checkedRows) => {dispatch(setCheckedRows(checkedRows))},
})

export default connect(mapStateToProps, mapDispatchToProps)(TableDataCell);
