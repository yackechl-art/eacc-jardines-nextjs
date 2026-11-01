import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateDrainage } from '../lib/drainage.ts';
import { locales } from '../lib/i18n.ts';
import { pathFor, resolveRoute, breadcrumbs } from '../lib/routes.ts';
test('slope, drop and elevation modes describe the same horizontal run', () => {
 const expected = calculateDrainage(10, 100, 'slope', 2);
 assert.equal(expected.drop, 0.2);
 assert.equal(expected.outlet, 99.8);
 assert.deepEqual(calculateDrainage(10, 100, 'drop', 0.2), expected);
 const elevations = calculateDrainage(10, 100, 'elevations', 99.8);
 assert.ok(Math.abs(elevations.slope - 2) < 1e-10);
});
test('zero, reverse slopes and negative reference elevations remain meaningful', () => {
 assert.equal(calculateDrainage(10, -5, 'slope', 0).outlet, -5);
 assert.equal(calculateDrainage(10, -5, 'slope', -2).outlet, -4.8);
 assert.equal(calculateDrainage(10, 0, 'elevations', 1).slope, -10);
});
test('rejects non-finite, zero length, out-of-range and inconsistent dimensions', () => {
 for (const args of [[0,0,'slope',2], [NaN,0,'slope',2], [10,Infinity,'drop',1], [10,0,'slope',101], [10001,0,'slope',1], [1,0,'elevations',2], [10,10000,'slope',-2]]) assert.throws(() => calculateDrainage(...args));
});
test('drainage has a localized route with tools breadcrumbs in all five languages', () => {
 for (const locale of locales) {
  const path = pathFor(locale, 'drainage');
  assert.deepEqual(resolveRoute(path.split('/').filter(Boolean)), {locale,kind:'drainage'});
  assert.equal(breadcrumbs({locale,kind:'drainage'})[1].path, pathFor(locale,'tools'));
 }
});
