'use strict';

describe('testaller.version module', function() {
  beforeEach(module('testaller.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
