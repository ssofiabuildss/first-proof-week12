import test from 'node:test';import assert from 'node:assert/strict';import {evaluateEvidence} from '../lib/evaluate.mjs';
test('complete administrative fields never certify skills',()=>{const o=evaluateEvidence({assessment_type:'Excel',source_label:'Fictional Demo',assessment_date:'2026-01-01',evidence_note:'Practice quiz'});assert.equal(o.status,'Documented');assert.equal(o.review_required,true);assert.match(o.limitations.join(' '),/not verified|not independently/i)});
test('missing fields mean incomplete, not failed',()=>{const o=evaluateEvidence({assessment_type:'Excel',source_label:'',assessment_date:'',evidence_note:''});assert.equal(o.status,'Incomplete');assert.ok(o.missing_fields.length===3)});
test('invalid future dates cannot be documented',()=>{const o=evaluateEvidence({assessment_type:'Excel',source_label:'Demo',assessment_date:'2099-01-01',evidence_note:'Sample'});assert.equal(o.status,'Incomplete')});

test('impossible calendar dates cannot be documented', () => {
  const result = evaluateEvidence({
    assessment_type: 'Excel',
    source_label: 'Fictional Demo',
    assessment_date: '2026-02-30',
    evidence_note: 'Fictional Excel practice'
  });

  assert.equal(result.status, 'Incomplete');
  assert.ok(result.missing_fields.includes('Valid assessment date'));
});
