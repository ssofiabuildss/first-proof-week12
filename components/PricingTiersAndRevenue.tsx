'use client';
import { useMemo, useState } from 'react';
import { calculateCohortRevenue, calculateRevenue, REVENUE_EXAMPLE, validateRevenue, type RevenueInputs } from '../lib/pricing';

const money = new Intl.NumberFormat('en-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 2 });
const number = new Intl.NumberFormat('en-MX', { maximumFractionDigits: 2 });
const inputStyle = 'mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900';
const tiers = [
  { id: 'free', segment: 'Students', name: 'Free educational organizer', price: 'MXN $0', cadence: 'Free informational tier', detail: 'Self-reported organization only where existing security allows. No skill verification. Google Forms/Sheets are free alternatives.', free: true },
  { id: 'student', segment: 'Students', name: 'Student premium concept', price: 'MXN $99', cadence: 'Hypothetical per student / month', detail: 'Pricing research only: no checkout, unlocked premium features, subscription or entitlement exists.', free: false },
  { id: 'institution', segment: 'Universities / educational organizations', name: 'Institutional cohort pilot concept', price: 'MXN $1,700', cadence: 'Hypothetical per cohort, up to 20 participants', detail: 'Fictional-data demonstration concept only. No institutional reports, integrations, admin account or actual pilot is offered.', free: false },
] as const;

export default function PricingTiersAndRevenue() {
  const [values, setValues] = useState<Record<keyof RevenueInputs,string>>({ leadsPerMonth: '100', conversionPercent: '10', monthlyPrice: '99' });
  const [cohortsText, setCohortsText] = useState('1');
  const [cohortPriceText, setCohortPriceText] = useState('1700');
  const data = useMemo(() => ({ leadsPerMonth: Number(values.leadsPerMonth), conversionPercent: Number(values.conversionPercent), monthlyPrice: Number(values.monthlyPrice) }), [values]);
  const error = Object.values(values).some(v => v.trim() === '') ? 'Complete the recurring-model inputs.' : validateRevenue(data);
  const recurring = !error ? calculateRevenue(data) : null;
  const cohorts = Number(cohortsText), cohortPrice = Number(cohortPriceText);
  let cohortError = '';
  let cohortResults: {monthlyRevenue:number; annualRevenue:number}|null = null;
  try {
    if (cohortsText.trim() === '' || cohortPriceText.trim() === '') throw Error('Complete both cohort inputs.');
    cohortResults = calculateCohortRevenue(cohorts,cohortPrice);
  } catch(e) {cohortError = e instanceof Error ? e.message : 'Invalid cohort values.';}
  return <div className="mb-8 space-y-6">
    <section aria-labelledby="pricing-tiers-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 id="pricing-tiers-heading" className="text-2xl font-bold">Pricing hypotheses — two customer segments</h2>
      <p className="mt-2 text-sm text-slate-700"><strong>Free vs paid:</strong> the free informational concept is separate from two proposed paid tiers. All paid tiers are <strong>NOT FOR SALE</strong>. Prices, demand, delivery capacity and purchasing commitments have not been verified.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">{tiers.map(t => <article key={t.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">{t.segment}</p>
        <h3 className="mt-2 text-lg font-bold">{t.name}</h3>
        <p className="mt-3 text-2xl font-extrabold">{t.price}</p>
        <p className="text-xs font-semibold text-slate-700">{t.cadence}</p>
        <p className="mt-3 text-sm text-slate-600">{t.detail}</p>
        <span className="mt-4 inline-block rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">{t.free?'NO VERIFIED PRODUCT ENTITLEMENT':'SIMULATED · NOT FOR SALE'}</span>
      </article>)}</div>
      <p className="mt-4 text-sm text-slate-600">Free baseline: test against properly configured Google Forms or Sheets, including staff time, student burden and error risk before making a value claim.</p>
    </section>
    <section aria-labelledby="revenue-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 id="revenue-heading" className="text-2xl font-bold">Monthly / annual revenue simulator</h2>
      <p className="mt-2 text-sm text-slate-600">These are illustrative arithmetic models — <strong>not actual sales, subscribers, forecasts or annual recurring revenue (ARR)</strong>. The two billing models are separate.</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="font-bold">A. Hypothetical recurring student model</h3>
          <p className="text-xs text-slate-600">Independent monthly prospects × conversion percentage × monthly price.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">{([
            ['leadsPerMonth','Prospects per month','1'],['conversionPercent','Conversion (%)','0.1'],['monthlyPrice','Price per month (MXN)','0.01'],
          ] as const).map(([key,label,step]) => <label key={key} className="text-xs font-semibold">{label}<input className={inputStyle} type="number" min="0" step={step} value={values[key]} onChange={e => setValues(x => ({...x,[key]:e.target.value}))}/></label>)}</div>
          {error ? <p role="alert" className="mt-3 text-sm text-red-700">{error}</p> : <dl className="mt-4 space-y-1 text-sm"><div>Expected conversions per month: <strong>{number.format(recurring!.expectedConversionsPerMonth)}</strong></div><div>Simulated monthly revenue: <strong>{money.format(recurring!.monthlyRevenue)}</strong></div><div>Simulated annual revenue: <strong>{money.format(recurring!.annualRevenue)}</strong></div></dl>}
          <p className="mt-3 text-xs text-slate-500">Annual = 12 × identical monthly acquisition revenue; excludes churn, retention, refunds, taxes, billing and costs. Fractional expected conversions are mathematical expectations, not real customers.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <h3 className="font-bold">B. Hypothetical institutional cohort model</h3>
          <p className="text-xs text-slate-600">Cohorts per month × one-time cohort fee (not a monthly student subscription).</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold">Cohorts per month<input className={inputStyle} type="number" min="0" step="1" value={cohortsText} onChange={e => setCohortsText(e.target.value)}/></label>
            <label className="text-xs font-semibold">Fee per cohort (MXN)<input className={inputStyle} type="number" min="0" step="0.01" value={cohortPriceText} onChange={e => setCohortPriceText(e.target.value)}/></label>
          </div>
          {cohortError ? <p role="alert" className="mt-3 text-sm text-red-700">{cohortError}</p> : <dl className="mt-4 space-y-1 text-sm"><div>Simulated monthly cohort revenue: <strong>{money.format(cohortResults!.monthlyRevenue)}</strong></div><div>Simulated annual cohort revenue: <strong>{money.format(cohortResults!.annualRevenue)}</strong></div></dl>}
          <p className="mt-3 text-xs text-slate-500">Assumes the same number of separately paid cohorts every month. No buyer commitment, completed cohorts or actual payments have been observed.</p>
        </div>
      </div>
      <p className="mt-4 text-sm"><a className="font-semibold text-teal-800 underline" href="/about">Read the 10:1 Memo and commercial NO-GO conditions on /about</a>.</p>
    </section>
  </div>;
}
