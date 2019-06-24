import React, {useState} from 'react';
import TableHeader from './tableHeader.js';
import TableRow from './tableRow.js';
import { connect } from 'react-redux';
import {
  setFilteredData,
  setVisibleColumns
} from '../actions/rootActions.js'
import { filterArr } from '../utils/filterArr.js'

import '../assets/CSS/tableControl.css';

function TableControl (props) {

  const [filterInput, setFilterInput] = useState('');
  const [visibilityListOpen, setVisibilityListOpen] = useState(false);
  const [numShow, setNumShow] = useState(20);

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      let filteredData = filterArr (props.data, filterInput)
      props.setFilteredData(filteredData)
    }
  }

  const onColumnVisibilityCheck = (e) => {
    let newVisibleColumns = {...props.visibleColumns}
    newVisibleColumns[e.target.id] = !newVisibleColumns[e.target.id]
    props.setVisibleColumns(newVisibleColumns)
  }

  const onScroll = (e) => {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      setNumShow((Math.min(numShow + 10, props.data.length)));
    }
  }

  if (props.data === undefined) return null;

  let rowsToDisplay = [];
  props.data.map((row) => {
    props.filteredData.slice(0, numShow).forEach((id) => {
      if (row['id'] === id) {rowsToDisplay.push(row)}
    })
    return null;
  })

  return (
    <div
      onScroll = {(e) =>{e.preventDefault(); onScroll(e)}}
    >
      <div className='control_panel'>
        { visibilityListOpen ?
          <div className='visibility_panel no_select'>
            <ul className='visibility_list'>
              {Object.keys(props.visibleColumns).map((columnHeader) => {
                return <li key={columnHeader}>
                  <input
                    id = {columnHeader}
                    type="checkbox"
                    className='checkbox'
                    checked = {props.visibleColumns[columnHeader]}
                    onChange={onColumnVisibilityCheck}
                  />
                  {columnHeader}
                </li>
              })}
            </ul>
            <button
              className='visibility_close_button'
              onClick = {() => setVisibilityListOpen(false)}
            >
              Close
            </button>
          </div>
          :
          <button
            className='visibility_button no_select'
            onClick={() => setVisibilityListOpen(true)}
          >
            Visibility
          </button>
        }

        <input
          className='filter_input'
          onChange = {(e) => setFilterInput(e.target.value)}
          value={filterInput}
          onKeyPress={onEnter}
        />
      </div>
      <div className='table_wrapper'>
        <table className='table no_select'>
          <thead>
            <TableHeader/>
          </thead>
          <tbody className='table_body'>
            {
              rowsToDisplay.map((row) => {
                return <TableRow
                  key={row['id']}
                  rowData = {row}
                  />
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    data: store.data,
    dataStructure: store.dataStructure,
    visibleColumns: store.visibleColumns,
    filteredData: store.filteredData,
  }
}

const mapDispatchToProps = dispatch => ({
    setFilteredData: (filteredData) => {dispatch(setFilteredData(filteredData))},
    setVisibleColumns: (newVisibleColumns) => {dispatch(setVisibleColumns(newVisibleColumns))},
})

export default connect(mapStateToProps, mapDispatchToProps) (TableControl);
