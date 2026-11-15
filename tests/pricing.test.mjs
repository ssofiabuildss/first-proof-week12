import test from 'node:test';
import assert from 'node:assert/strict';
import { EXAMPLE,calculatePricing,parseSavedScenarios,validatePricing } from '../lib/pricing.ts';

test('cohort reference: 1700 - 1000 = 700 and margin ~41.2%',()=>{
 const result=calculatePricing(EXAMPLE);
 assert.equal(result.contribution,700);
 assert.ok(Math.abs(result.marginPercent-41.176470588)<0.001);
 assert.equal(result.illustrativeTenToOneBenefit,17000);
});
test('support costs reduce contribution',()=>assert.equal(calculatePricing({...EXAMPLE,supportMaintenance:300}).contribution,400));
test('zero price never divides by zero',()=>assert.equal(calculatePricing({...EXAMPLE,cohortPrice:0}).marginPercent,null));
test('participants 0 are rejected',()=>assert.match(validatePricing({...EXAMPLE,participants:0}),/Participants/));
test('negative cost is rejected',()=>assert.match(validatePricing({...EXAMPLE,directCosts:-1}),/Amounts/));
test('non-finite input is rejected',()=>assert.match(validatePricing({...EXAMPLE,cohortPrice:NaN}),/finite/));
test('invalid saved JSON cannot crash app',()=>assert.deepEqual(parseSavedScenarios('{broken'),[]));
test('reject malformed saved data',()=>assert.deepEqual(parseSavedScenarios('[{"id":"x","name":"x","inputs":{"participants":0},"savedAt":"t"}]'),[]));

test('incomplete stored data is rejected',()=>assert.deepEqual(parseSavedScenarios('[{"id":"x","name":"x","inputs":{"participants":20},"savedAt":"t"}]'),[]));
