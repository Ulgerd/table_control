import TableRow from '../components/tableRow.js'
import React from 'react';
import { cleanup } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const rowData =  {'id':1, 'name': 'test', 'value': 'infinity'};
const initialStore = {
    checkedRows: [1],
    dataStructure: ['ID', 'name','value'],
    visibleColumns: [1, 2, 3]
  };
const mockStore = configureStore()
let store, wrapper;

beforeEach(() => {
  store = mockStore(initialStore)
  wrapper = mount(
    <TableRow store={store} rowData={rowData}/>
  )
})

afterEach(cleanup);

describe('TableRow tests', () => {
  it('should return array of objects in correct order', () => {
    console.log(wrapper);
    expect(wrapper.find('tr')).toHaveLength(1);
    // expect(wrapper.find('TableDataCell')).toHaveLength(1);
   });
});
