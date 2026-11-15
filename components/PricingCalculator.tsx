'use client';
import { useEffect, useMemo, useState } from 'react';
import PricingTiersAndRevenue from './PricingTiersAndRevenue';
import {
  EXAMPLE, STORAGE_KEY, calculatePricing, parseSavedScenarios, validatePricing,
  type PricingInputs, type SavedScenario,
} from '../lib/pricing';

const currency = new Intl.NumberFormat('en-MX', { style:'currency', currency:'MXN', maximumFractionDigits:2 });
const number = new Intl.NumberFormat('en-MX', { maximumFractionDigits:1 });
const fields: {key:keyof PricingInputs; label:string; hint:string}[] = [
  {key:'participants', label:'Participants', hint:'Fictional cohort size'},
  {key:'cohortPrice', label:'Cohort price (MXN)', hint:'Proposed revenue; no payments collected'},
  {key:'directCosts', label:'Direct costs (MXN)', hint:'Estimated delivery costs'},
  {key:'acquisitionOverhead', label:'Acquisition and overhead (MXN)', hint:'Do not hide the cost of sales'},
  {key:'supportMaintenance', label:'Support and maintenance (MXN)', hint:'Operating obligations matter'},
];
const classes = {
  input:'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600',
  button:'rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-40',
};
export default function PricingCalculator(){
  const [data,setData]=useState<PricingInputs>({...EXAMPLE});
  const [fieldTexts,setFieldTexts]=useState<Record<keyof PricingInputs,string>>({
    participants:'20',cohortPrice:'1700',directCosts:'1000',acquisitionOverhead:'0',supportMaintenance:'0'
  });
  const [saved,setSaved]=useState<SavedScenario[]>([]);
  const [name,setName]=useState('Cohort 20 — simulated');
  const [notice,setNotice]=useState('');
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    try {setSaved(parseSavedScenarios(window.localStorage.getItem(STORAGE_KEY)));}
    catch {setNotice('Browser storage is unavailable; scenarios may not persist.');}
    setReady(true);
  },[]);
  const error=useMemo(()=>{
    if(Object.values(fieldTexts).some(x=>x.trim()===''))return 'Complete every numeric field.';
    return validatePricing(data);
  },[data,fieldTexts]);
  const result=useMemo(()=> error ? null : calculatePricing(data),[error,data]);
  const update=(key:keyof PricingInputs,value:string)=>{
    setFieldTexts(p=>({...p,[key]:value}));
    setData(p=>({...p,[key]:value.trim()===''?NaN:Number(value)}));
    setNotice('');
  };
  function persist(next:SavedScenario[]){
    try {window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));setSaved(next);return true;}
    catch {setNotice('Could not save. Check browser storage settings.');return false;}
  }
  function save(){
    if(error || !result){setNotice('Correct invalid numbers before saving.');return;}
    const clean=name.trim();
    if(!clean || clean.length>60){setNotice('Scenario name must be 1–60 characters.');return;}
    if(saved.length>=30){setNotice('Maximum 30 scenarios. Delete one to save another.');return;}
    const scenario:SavedScenario={id:crypto.randomUUID(),name:clean,inputs:{...data},savedAt:new Date().toISOString()};
    if(persist([scenario,...saved]))setNotice('Simulated scenario saved on this browser only.');
  }
  function load(s:SavedScenario){
    setData({...s.inputs});
    setFieldTexts({
      participants:String(s.inputs.participants),cohortPrice:String(s.inputs.cohortPrice),
      directCosts:String(s.inputs.directCosts),acquisitionOverhead:String(s.inputs.acquisitionOverhead),
      supportMaintenance:String(s.inputs.supportMaintenance)
    });
    setName(s.name);setNotice(`Loaded simulated scenario: ${s.name}`);
  }
  return <main className="min-h-screen bg-[#f5f8f8] px-4 pb-12 pt-8 text-slate-900 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[.25em] text-teal-700">FIRST-PROOF · WEEK 14</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Pricing &amp; Scenarios</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">FIRST-PROOF is an educational prototype that helps students organize self-reported academic project evidence. It does not verify skills, authenticate evidence, or issue certifications. This page presents hypothetical pricing and financial scenarios, not real offers.</p>
          <p className="mt-2 text-sm text-slate-600">An internal decision aid. Organize evidence, do not certify it.</p></div>
        <span className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal-800">SIMULATED · NOT A REAL OFFER</span>
      </header>
      <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950" role="note">
        <strong>Classroom scenario only.</strong> Numbers are assumptions, not real sales, real customer benefit, verified profit, or permission to deploy with real student data. This tool never verifies skills or credentials.
      </div>
      <PricingTiersAndRevenue />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="calculator-title">
          <h2 id="calculator-title" className="text-xl font-bold">Scenario calculator</h2>
          <p className="mb-5 mt-1 text-sm text-slate-500">Adjust fictional assumptions. All values are in MXN.</p>
          <div className="grid gap-4 sm:grid-cols-2">{fields.map(f=><label key={f.key} className="block text-sm font-semibold">
            {f.label}<span className="mt-1 block text-xs font-normal text-slate-500">{f.hint}</span>
            <input aria-label={f.label} className={`${classes.input} mt-2`} type="number" step={f.key==='participants'?'1':'0.01'} min={f.key==='participants'?1:0} max={f.key==='participants'?10000:1000000000}
              inputMode="decimal" value={fieldTexts[f.key]} onChange={e=>update(f.key,e.target.value)} />
          </label>)}</div>
          {error&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
          <div className="mt-6 border-t border-slate-200 pt-5">
            <label className="block text-sm font-semibold" htmlFor="scenario-name">Scenario name</label>
            <input id="scenario-name" maxLength={60} className={`${classes.input} mt-2`} value={name} onChange={e=>setName(e.target.value)} />
            <button disabled={!!error||!ready} onClick={save} className={`${classes.button} mt-3 w-full bg-teal-700 text-white hover:bg-teal-800`}>Save simulated scenario</button>
            {notice&&<p role="status" className="mt-3 text-sm text-teal-800">{notice}</p>}
          </div>
        </section>
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="results-title">
            <h2 id="results-title" className="text-xl font-bold">Estimated financial result</h2>
            <p className="mt-1 text-xs text-slate-500">Calculations only — not verified customer value or net profit.</p>
            {result?<>
              <div className={`my-5 rounded-2xl p-5 ${result.contribution<0?'bg-red-50':'bg-teal-50'}`}>
                <p className="text-sm font-semibold text-slate-600">Contribution after entered costs</p>
                <p className={`mt-2 text-4xl font-black ${result.contribution<0?'text-red-700':'text-teal-800'}`}>{currency.format(result.contribution)}</p>
                <p className="mt-2 text-sm text-slate-600">Contribution margin: <strong>{result.marginPercent===null?'N/A (zero revenue)':`${number.format(result.marginPercent)}%`}</strong></p>
              </div>
              <dl className="space-y-3 text-sm">{[
                ['Total modeled costs',currency.format(result.totalCosts)],
                ['Revenue per participant',currency.format(result.revenuePerParticipant)],
                ['Cost per participant',currency.format(result.costPerParticipant)],
                ['Illustrative 10:1 benefit threshold',currency.format(result.illustrativeTenToOneBenefit)],
              ].map(([k,v])=><div key={k} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2"><dt className="text-slate-600">{k}</dt><dd className="font-bold text-right">{v}</dd></div>)}</dl>
              <p className="mt-5 rounded-xl bg-slate-100 p-3 text-xs text-slate-600">A 10:1 threshold is an illustrative classroom benchmark, <strong>not</strong> evidence that customers save that amount.</p>
            </>:<p className="mt-5 text-red-700">Enter valid assumptions to see results.</p>}
          </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="saved-title">
            <div className="flex items-center justify-between gap-2"><h2 id="saved-title" className="text-xl font-bold">Saved scenarios</h2><span className="text-xs text-slate-500">{saved.length}/30</span></div>
            <p className="mt-1 text-xs text-slate-500">Stored on this device/browser, not synced. Financial assumptions only.</p>
            <div className="mt-4 space-y-3">{saved.length===0?<p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No scenarios saved yet. Save your first simulated case above.</p>:saved.map(s=>{
              const summary=calculatePricing(s.inputs);
              return <div key={s.id} className="rounded-2xl border border-slate-200 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold break-all">{s.name}</p><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">SIMULATED</span></div>
                <p className="mt-1 text-xs text-slate-600">{s.inputs.participants} participants · price {currency.format(s.inputs.cohortPrice)} · contribution {currency.format(summary.contribution)}</p>
                <div className="mt-3 flex gap-2"><button className={`${classes.button} bg-teal-50 text-teal-800 hover:bg-teal-100`} onClick={()=>load(s)}>Load</button>
                  <button className={`${classes.button} bg-red-50 text-red-700 hover:bg-red-100`} onClick={()=>{if(window.confirm(`Delete simulated scenario “${s.name}”?`))persist(saved.filter(x=>x.id!==s.id));}}>Delete</button></div>
              </div>;
            })}</div>
          </section>
        </div>
      </div>
      <footer className="mt-8 rounded-2xl bg-[#dfeaf0] p-4 text-center text-sm font-semibold text-slate-800">Information complete — skills and authenticity not verified.</footer>
    </div>
  </main>;
}
