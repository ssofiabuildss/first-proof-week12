export type PricingInputs = {
  participants: number;
  cohortPrice: number;
  directCosts: number;
  acquisitionOverhead: number;
  supportMaintenance: number;
};
export type PricingResult = {
  totalCosts: number;
  contribution: number;
  marginPercent: number | null;
  revenuePerParticipant: number;
  costPerParticipant: number;
  illustrativeTenToOneBenefit: number;
};
export const EXAMPLE: PricingInputs = {
  participants: 20,
  cohortPrice: 1700,
  directCosts: 1000,
  acquisitionOverhead: 0,
  supportMaintenance: 0,
};
export function validatePricing(data: PricingInputs): string | null {
  const x = [data.participants, data.cohortPrice, data.directCosts, data.acquisitionOverhead, data.supportMaintenance];
  if (x.some((v) => typeof v !== 'number' || !Number.isFinite(v))) return 'All values must be valid finite numbers.';
  if (!Number.isInteger(data.participants) || data.participants < 1 || data.participants > 10000) return 'Participants must be a whole number from 1 to 10,000.';
  if ([data.cohortPrice, data.directCosts, data.acquisitionOverhead, data.supportMaintenance].some((v) => v < 0 || v > 1_000_000_000)) return 'Amounts must be between MXN 0 and MXN 1,000,000,000.';
  return null;
}
export function calculatePricing(inputs: PricingInputs): PricingResult {
  const error = validatePricing(inputs);
  if (error) throw new Error(error);
  const totalCosts = inputs.directCosts + inputs.acquisitionOverhead + inputs.supportMaintenance;
  const contribution = inputs.cohortPrice - totalCosts;
  return {
    totalCosts,
    contribution,
    marginPercent: inputs.cohortPrice === 0 ? null : (contribution / inputs.cohortPrice) * 100,
    revenuePerParticipant: inputs.cohortPrice / inputs.participants,
    costPerParticipant: totalCosts / inputs.participants,
    illustrativeTenToOneBenefit: inputs.cohortPrice * 10,
  };
}
export type SavedScenario = { id: string; name: string; inputs: PricingInputs; savedAt: string };
export const STORAGE_KEY = 'first-proof-week14-fictional-pricing-scenarios-v1';
export function parseSavedScenarios(value: string | null): SavedScenario[] {
  if (!value) return [];
  try {
    const raw: unknown = JSON.parse(value);
    if (!Array.isArray(raw)) return [];
    return raw.filter((s): s is SavedScenario => {
      if (typeof s !== 'object' || s === null) return false;
      const a = s as Partial<SavedScenario>;
      return typeof a.id === 'string' && typeof a.name === 'string' && a.name.length <= 60 &&
        typeof a.savedAt === 'string' && !!a.inputs && validatePricing(a.inputs) === null;
    }).slice(0, 30);
  } catch { return []; }
}


/** Recurring monthly hypothetical user conversion model. Not a cohort-fee model. */
export type RevenueInputs = { leadsPerMonth: number; conversionPercent: number; monthlyPrice: number };
export type RevenueResult = { expectedConversionsPerMonth: number; monthlyRevenue: number; annualRevenue: number };
export const REVENUE_EXAMPLE: RevenueInputs = { leadsPerMonth: 100, conversionPercent: 10, monthlyPrice: 99 };
export function validateRevenue(data: RevenueInputs): string | null {
  if (!data || [data.leadsPerMonth, data.conversionPercent, data.monthlyPrice].some(v => typeof v !== 'number' || !Number.isFinite(v))) return 'Enter finite numeric assumptions.';
  if (!Number.isInteger(data.leadsPerMonth) || data.leadsPerMonth < 0 || data.leadsPerMonth > 1_000_000) return 'Monthly prospects must be a whole number from 0 to 1,000,000.';
  if (data.conversionPercent < 0 || data.conversionPercent > 100) return 'Conversion must be between 0% and 100%.';
  if (data.monthlyPrice < 0 || data.monthlyPrice > 1_000_000) return 'Monthly price must be between MXN 0 and MXN 1,000,000.';
  return null;
}
export function calculateRevenue(data: RevenueInputs): RevenueResult {
  const error = validateRevenue(data);
  if (error) throw new Error(error);
  const expectedConversionsPerMonth = data.leadsPerMonth * data.conversionPercent / 100;
  const monthlyRevenue = expectedConversionsPerMonth * data.monthlyPrice;
  return { expectedConversionsPerMonth, monthlyRevenue, annualRevenue: monthlyRevenue * 12 };
}

/** Explicit cohort billing units, separate from recurring subscriber pricing. */
export function calculateCohortRevenue(cohortsPerMonth: number, pricePerCohort: number) {
  if (![cohortsPerMonth, pricePerCohort].every(v => typeof v === 'number' && Number.isFinite(v)) || !Number.isInteger(cohortsPerMonth) || cohortsPerMonth < 0 || cohortsPerMonth > 10000 || pricePerCohort < 0 || pricePerCohort > 1_000_000)
    throw new Error('Enter valid fictional cohorts per month and price per cohort.');
  const monthlyRevenue = cohortsPerMonth * pricePerCohort;
  return { monthlyRevenue, annualRevenue: monthlyRevenue * 12 };
}
