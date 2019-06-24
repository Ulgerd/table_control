import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setNewData } from './actions/rootActions.js'
import { addId } from './utils/addId.js'
import { filterArr } from './utils/filterArr.js'
//components
import Header from './components/header.js';
import NoPage from './components/noPage.js';
import TableControl from './components/tableControl.js';
import MainPage from './components/mainPage.js';
//CSS
import './assets/CSS/App.css';

const API = "https://tablecontrol-aa8535dpv.now.sh/data/axios_data.json";

function App (props) {

  useEffect(() => {
   const fetchData = async () => {
     const result = await axios(API);
     let dataWithId = addId(result.data);
     let filteredData = filterArr(dataWithId, '')
     props.setNewData(dataWithId, filteredData)
   };

   fetchData();
 }, []);

return (
    <Router>
      <div className='App' >
        <Header/>
        <Switch>
          <Route
            exact path='/'
            component={MainPage}
          />
          <Route
            exact path='/table/'
            render={({match}) =>
              <TableControl/>
            }
          />
          <Route component={NoPage}/>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = store => {
  return {
    data: store.data,
  }
}

const mapDispatchToProps = dispatch => ({
    setNewData: (dataWithId, filteredData) => {dispatch(setNewData(dataWithId, filteredData))},
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
