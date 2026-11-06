
function isValidAssessmentDate(value){
 if(typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
 const [year,month,day] = value.split('-').map(Number);
 const date = new Date(Date.UTC(year,month-1,day));
 if(Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month-1 ||
    date.getUTCDate() !== day) return false;
 return value <= new Date().toISOString().slice(0,10);
}
export const TYPES=['Excel','Analytical reasoning','Problem solving'];
export function evaluateEvidence(input){
 const missing=[];
 if(!TYPES.includes(input.assessment_type))missing.push('Valid assessment type');
 if(!input.source_label?.trim())missing.push('Source');
 if(!isValidAssessmentDate(input.assessment_date))missing.push('Valid assessment date');
 if(!input.evidence_note?.trim())missing.push('Evidence description');
 const status=missing.length?'Incomplete':'Documented';
 return {status,missing_fields:missing,limitations:['Self-reported record; no independent test result authenticated','Candidate skill is not verified by this field check','No employer acceptance or assessment waiver has been established'],review_required:true};
}
