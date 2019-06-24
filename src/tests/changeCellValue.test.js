import {changeCellValue} from '../utils/changeCellValue.js'

describe('reorder tests', () => {
  it('should return array in correct order', () => {
    expect(changeCellValue([
      {
        "id": 0,
        "Name": "foo"
      }, {
        "id": 1,
        "Name": "bar"
      }, {
        "id": 2,
        "Name": "baz"
      }
    ], [
      0, 2
    ], 'Name', 'cat')).toStrictEqual([
      {
        "id": 0,
        "Name": "cat"
      }, {
        "id": 1,
        "Name": "bar"
      }, {
        "id": 2,
        "Name": "cat"
      }
    ]);

    expect(changeCellValue([
      {
        "id": 0,
        "Name": "foo"
      }, {
        "id": 1,
        "Name": "bar"
      }, {
        "id": 2,
        "Name": "baz"
      }
    ], [
      1
    ], 'Name', 'cat')).toStrictEqual([
      {
        "id": 0,
        "Name": "foo"
      }, {
        "id": 1,
        "Name": "cat"
      }, {
        "id": 2,
        "Name": "baz"
      }
    ]);

    expect(changeCellValue([
      {
        "id": 0,
        "Name": "foo",
        "Value": '10'
      }, {
        "id": 1,
        "Name": "bar",
        "Value": '15'
      }, {
        "id": 2,
        "Name": "baz",
        "Value": '13'
      }
    ], [
      2
    ], 'Name', 'cat')).toStrictEqual([
      {
        "id": 0,
        "Name": "foo",
        "Value": '10'
      }, {
        "id": 1,
        "Name": "bar",
        "Value": '15'
      }, {
        "id": 2,
        "Name": "cat",
        "Value": '13'
      }
    ]);
  });
});
