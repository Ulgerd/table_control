
import React, {Component} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => { //переписать, если будет время
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class TableHeader extends Component {

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.dataStructure,
      result.source.index,
      result.destination.index
    );

    this.props.onDataStructureChange(items)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <tr
              ref={provided.innerRef}
            >
              {this.props.dataStructure.map( (columnHeader, index) => {
                if (this.props.visibleColumns[columnHeader]) {
                  return <Draggable key={columnHeader} draggableId={columnHeader} index={index}>
                    {(provided, snapshot) => (
                    <th
                      ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      onClick = {() => this.props.onSortColumn(columnHeader)}
                    >
                      {columnHeader}
                    </th>
                  )}
                  </Draggable>
                }
              }
              )}
            </tr>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
