import { sortColumns } from '../utils/sortColumns.js'

describe('sortColumns tests', () => {
   it('should return array of objects in correct order', () => {
      expect(sortColumns([{'name': 'foo'}, {'name':'bar'}, {'name': 'baz'}], 'name')).toStrictEqual([{'name':'bar'},{'name': 'baz'},{'name': 'foo'}]);
      expect(sortColumns([{'name': 'foo', 'ID': 1}, {'name':'bar', 'ID': 3}, {'name': 'baz', 'ID': 2}], 'name')).toStrictEqual([{'name':'bar','ID': 3},{'name': 'baz', 'ID': 2},{'name': 'foo', 'ID': 1}]);
      expect(sortColumns([{'ID': 'foo'}, {'ID':'bar'}, {'ID': 'baz'}], 'name')).toStrictEqual([{'ID': 'foo'}, {'ID':'bar'}, {'ID': 'baz'}]);
   });
});
