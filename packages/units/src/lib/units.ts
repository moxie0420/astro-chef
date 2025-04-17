const ImperialWeight = ['pound', 'ounce'] as const;

const liquidImperial = ['gallon', 'quart', 'pint', 'cup', 'fluid ounce'];
const liquidMetric = ['liter', 'milliliter'] as const;

const dryImperial = ['cups', 'tablespoon', 'teaspoon'] as const;
const dryMetric = ['kilogram', 'gram'] as const;

const Imperial = [
  ...liquidImperial,
  ...dryImperial,
  ...ImperialWeight,
] as const;
const Metric = [...liquidMetric, ...dryMetric] as const;

const AllUnits = [...Imperial, ...Metric] as const;

export type WeightImperialUnit = (typeof ImperialWeight)[number];

export type LiquidImperialUnit = (typeof liquidImperial)[number];
export type LiquidMetricUnit = (typeof liquidMetric)[number];

export type DryImperialUnit = (typeof dryImperial)[number];
export type DryMetricUnit = (typeof dryMetric)[number];

export type ImperialUnit = (typeof Imperial)[number];
export type MetricUnit = (typeof Metric)[number];

export type Unit = (typeof AllUnits)[number];

export function getUnitSystem(unit: string): 'Imperial' | 'Metric' | 'none' {
  const predicate = (v: string) => v === unit;
  if (Imperial.find(predicate)) return 'Imperial';
  if (Metric.find(predicate)) return 'Metric';
  return 'none';
}

export function isWetUnit(unit: Unit): boolean {
  const predicate = (v: string) => v === unit;
  if (dryImperial.find(predicate)) return false;
  if (dryMetric.find(predicate)) return false;
  return true;
}
