import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const page = readFileSync('app/product/page.tsx', 'utf8');

test('demo warns users before submission', () => {
  assert.match(page, /FICTIONAL DEMONSTRATION — SAVING DISABLED/);
  assert.match(page, /Check fictional fields \(does not save\)/);
});

test('evaluation does not attempt to insert records', () => {
  assert.doesNotMatch(page, /\.insert\s*\(/);
  assert.match(page, /setPreview\(result\)/);
});

test('documented status never claims successful saving', () => {
  assert.match(page, /Information complete — skills and authenticity not verified/);
  assert.match(page, /No record was saved/);
});
