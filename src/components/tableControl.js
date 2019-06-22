import React, {useState} from 'react';
import TableHeader from './tableHeader.js';
import TableRow from './tableRow.js';
import { connect } from 'react-redux';
import {
  setFilteredData,
  setVisibleColumns
} from '../actions/rootActions.js'

function TableControl (props) {

  const [filterInput, setFilterInput] = useState('');
  const [visibilityListOpen, setVisibilityListOpen] = useState(false);
  const [numShow, setNumShow] = useState(20);

  const onInputChange = (filter) => {
    setFilterInput(filter)
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      props.setFilteredData(filterInput)
    }
  }

  const onColumnVisibilityCheck = (e) => {
    let newVisibleColumns = {...props.visibleColumns}
    newVisibleColumns[e.target.value] = !newVisibleColumns[e.target.value]
    props.setVisibleColumns(newVisibleColumns)
  }

  const onScroll = (e) => {
    if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight) {
      setNumShow(({ numShow }) => ({
        numShow: Math.min(numShow + 10, props.data.length),
      }));
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
      <div className = "top"
        onScroll = {(e) =>{e.preventDefault(); onScroll(e)}}
      >
        <div >
          { visibilityListOpen ?
            <div>
              <ul>
                {props.dataStructure.map((columnHeader) => {
                  return <li key={columnHeader}>
                    <input
                      type="checkbox"
                      value = {columnHeader}
                      onChange={onColumnVisibilityCheck}
                      defaultChecked={true}
                    />
                    {columnHeader}
                  </li>
                })}
              </ul>
              <button
                onClick = {() => setVisibilityListOpen(false)}
              >
                Submit
              </button>
            </div>

            :
            <button
              onClick={() => setVisibilityListOpen(true)}
            >
              Visibility
            </button>
          }
          <input
            onChange = {(e) => onInputChange(e.target.value)}
            value={filterInput}
            onKeyPress={onEnter}
          />
        </div>
        <table>
          <thead>
            <TableHeader/>
          </thead>
          <tbody>
            {
              rowsToDisplay.map((row) => {
                return <TableRow
                  key={row['id']}
                  data = {row}
                  />
              })
            }
          </tbody>
        </table>
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
    setFilteredData: (filterInput) => {dispatch(setFilteredData(filterInput))},
    setVisibleColumns: (newVisibleColumns) => {dispatch(setVisibleColumns(newVisibleColumns))},
})

export default connect(mapStateToProps, mapDispatchToProps) (TableControl);
