import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { setNewData } from './actions/rootActions.js'
//components
import Header from './components/header.js';
import NoPage from './components/noPage.js';
import TableControl from './components/tableControl.js';
import MainPage from './components/mainPage.js';

//CSS
import './App.css';

const API = "https://table-control.ulgerd.now.sh/data/axios_data.json";

class App extends Component {

  state = {
    isLoading: false,
    error: null
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(API)
      .then( result =>
        this.props.setNewData(result.data),
        this.setState({
        isLoading: false
      })
    )
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    return (<Router>
      <div className='App'>
        <Header/>
        <Switch>
          <Route
            exact path='/'
            component={MainPage}
          />
          <Route
            exact path='/table/'
            render={({match}) =>
              <TableControl
              />
            }
          />
          <Route component={NoPage}/>
        </Switch>
      </div>
    </Router>);
  }
}

const mapStateToProps = store => {
  return {
    data: store.data,
  }
}

const mapDispatchToProps = dispatch => ({
    setNewData: (newData) => {dispatch(setNewData(newData))},
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
