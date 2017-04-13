'use strict';

angular.module('testaller.version', [
  'testaller.version.interpolate-filter',
  'testaller.version.version-directive'
])

.value('version', '0.1');
