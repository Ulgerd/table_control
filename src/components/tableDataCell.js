import React, {Component} from 'react';

export default class TableDataCell extends Component {

  state = {
    editingData: false,
    inputValue: this.props.cellData
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
            >
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

// onDoubleClick={() => this.setState({editingData: true})}
// columnHeader
// cellData = {this.props.data[columnHeader]}
