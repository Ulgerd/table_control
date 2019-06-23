import { reorder } from '../utils/reorder.js'

describe('reorder tests', () => {
   it('should return array in correct order', () => {
      expect(reorder(['foo','bar','baz'], 0, 1)).toStrictEqual(['bar','foo','baz']);
      expect(reorder(['foo','bar','baz'], 0, 0)).toStrictEqual(['foo','bar','baz']);
      expect(reorder(['foo','bar','baz'], 2, 0)).toStrictEqual(['baz','foo','bar']);
   });
});
