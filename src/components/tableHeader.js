import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
//redux
import {
  setDataStructure,
  sortFilteredData,
} from '../actions/rootActions.js'
//utils
import { sortColumns } from '../utils/sortColumns.js';
import { reorder } from '../utils/reorder.js';

function TableHeader (props) {

  const onSortColumn = (columnName) => {
    let newData = sortColumns(props.data, columnName)
    props.sortFilteredData(newData)
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      props.dataStructure,
      result.source.index,
      result.destination.index
    );

    props.setDataStructure(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <tr
            ref={provided.innerRef}
          >
            {props.dataStructure.map( (columnHeader, index) => {
              if (props.visibleColumns[columnHeader]) {
                return <Draggable
                  key={columnHeader}
                  draggableId={columnHeader}
                  index={index}
                  >
                    {(provided, snapshot) => (
                    <th
                      ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      onClick = {() => onSortColumn(columnHeader)}
                    >
                      {columnHeader}
                    </th>

                  )}
                </Draggable>
              }
              return null;
            })}
            {provided.placeholder}
          </tr>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const mapStateToProps = store => {
  return {
    data: store.data,
    dataStructure: store.dataStructure,
    visibleColumns: store.visibleColumns,
  }
}

const mapDispatchToProps = dispatch => ({
    setDataStructure: (newArray) => {dispatch(setDataStructure(newArray))},
    sortFilteredData: (sortedData) => {dispatch(sortFilteredData(sortedData))},
})

export default connect(mapStateToProps, mapDispatchToProps) (TableHeader);
