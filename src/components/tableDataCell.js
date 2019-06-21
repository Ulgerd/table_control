import React, {Component} from 'react';

export default class TableDataCell extends Component {

  state = {
    editingData: false,
    inputValue: this.props.cellData,
    contextMenu: false
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.setNewCellValue(this.props.columnHeader, this.state.inputValue)
      this.setState({editingData: false})
    }
  }

  onClick = (e) => {
    e.persist()
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.oneClick(e)
    }, 250);
  }

  onDoubleClick = () => {
    clearTimeout(this.timer);
    this.setState({editingData: true})
  }

  render() {
    return (
            <td
              onClick = {this.onClick}
              onDoubleClick={this.onDoubleClick}
              onContextMenu={(e)=> {e.preventDefault(); this.setState({contextMenu: true})}}
              className={'dataCell'}
            >
              {this.state.contextMenu ?
                <ul className={'dropdown'}>
                  <li className={'dropdownItem'} onClick ={()=> {this.props.onCloneRow(this.props.rowID); this.setState({contextMenu: false})}}>продублировать</li>
                  <li className={'dropdownItem'} onClick ={()=> {this.setState({editingData: true}); this.setState({contextMenu: false})}}>изменить</li>
                  <li className={'dropdownItem'} onClick ={()=> {this.props.onDeleteRow(this.props.rowID); this.setState({contextMenu: false})}}>удалить</li>
                </ul> : null}

              {this.state.editingData ?
                <input
                  autoFocus
                  onChange ={(e) => this.setState({inputValue: e.target.value})}
                  value={this.state.inputValue}
                  onKeyPress={this.onEnter}
                /> :
                this.props.cellData}

            </td>

    )
  }
}
