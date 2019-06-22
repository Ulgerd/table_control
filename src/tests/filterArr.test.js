import { filterArr } from '../utils/filterArr.js'

describe('filterArr tests', () => {
   it('should return "id" of object', () => {
      expect(filterArr([{'id': 1, 'ID': 'foo'}, {'id': 2,'name': 'boo'}, {'id': 3,'JustString': 'bar'}], 'f')).toStrictEqual([1]);
   });
   it('should return "id"s of objects', () => {
      expect(filterArr([{'id': 1, 'ID': 'foo'}, {'id': 2,'name': 'boo'}, {'id': 3,'JustString': 'bar'}], 'b')).toStrictEqual([2,3]);
   });
   it('should return empty array if noone matches', () => {
      expect(filterArr([{'id': 1, 'ID': 'foo'}, {'id': 2,'name': 'boo'}, {'id': 3,'JustString': 'bar'}], 'c')).toStrictEqual([]);
   });
});
