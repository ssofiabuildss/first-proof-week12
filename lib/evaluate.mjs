export const TYPES=['Excel','Analytical reasoning','Problem solving'];
export function evaluateEvidence(input){
 const missing=[];
 if(!TYPES.includes(input.assessment_type))missing.push('Valid assessment type');
 if(!input.source_label?.trim())missing.push('Source');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(input.assessment_date||'')||Number.isNaN(Date.parse(input.assessment_date))||input.assessment_date>new Date().toISOString().slice(0,10))missing.push('Valid assessment date');
 if(!input.evidence_note?.trim())missing.push('Evidence description');
 const status=missing.length?'Incomplete':'Documented';
 return {status,missing_fields:missing,limitations:['Self-reported record; no independent test result authenticated','Candidate skill is not verified by this field check','No employer acceptance or assessment waiver has been established'],review_required:true};
}
