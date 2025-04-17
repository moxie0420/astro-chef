import { Unit } from './units.js';

export const poundToOunce: UnitConverter = (v) => v * 16;
export const poundToGram: UnitConverter = (v) => v * 453.59237;
export const poundToKilogram: UnitConverter = (v) => v * 0.45359237;

export const ounceToPound: UnitConverter = (v) => v * 0.0625;
export const ounceToGram: UnitConverter = (v) => v * 28.34952;
export const ounceToKilogram: UnitConverter = (v) => v * 0.0283495;

export const gramToPound: UnitConverter = (v) => v * 0.0022046;
export const gramToOunce: UnitConverter = (v) => v * 0.3527396;
export const gramToKilogram: UnitConverter = (v) => v * 0.001;

export const gallonToQuart: UnitConverter = (v) => v * 4;
export const gallonToPint: UnitConverter = (v) => v * 8;
export const gallonToFluidOunce: UnitConverter = (v) => v * 128;
export const gallonToLiter: UnitConverter = (v) => v * 3.785412;
export const gallonToMilliliter: UnitConverter = (v) => v * 3785.412;

export const quartToGallon: UnitConverter = (v) => v * 0.25;
export const quartToPint: UnitConverter = (v) => v * 2;
export const quartToFluidOunce: UnitConverter = (v) => v * 32;
export const quartToLiter: UnitConverter = (v) => v * 0.946353;
export const quartToMilliliter: UnitConverter = (v) => v * 946.353;

export const pintToGallon: UnitConverter = (v) => v * 0.125;
export const pintToQuart: UnitConverter = (v) => v * 0.5;
export const pintToFluidOunce: UnitConverter = (v) => v * 16;
export const pintToLiter: UnitConverter = (v) => v * 0.4731765;
export const pintToMilliliter: UnitConverter = (v) => v * 473.1765;

export const FluidOunceToGallon: UnitConverter = (v) => v * 0.00078125;
export const FluidOunceToQuart: UnitConverter = (v) => v * 0.3125;
export const FluidOunceToPint: UnitConverter = (v) => v * 0.0625;
export const FluidOunceToLiter: UnitConverter = (v) => v * 0.02957353;
export const FluidOunceToMilliliter: UnitConverter = (v) => v * 29.57353;

export const LiterToGallon: UnitConverter = (v) => v * 0.264172;
export const LiterToQuart: UnitConverter = (v) => v * 1.056688;
export const LiterToPint: UnitConverter = (v) => v * 2.113376;
export const LiterToFluidOunce: UnitConverter = (v) => v * 33.81402;
export const LiterToMilliliter: UnitConverter = (v) => v * 1000;

export const MilliliterToGallon: UnitConverter = (v) => v * 0.000264172;
export const MilliliterToQuart: UnitConverter = (v) => v * 0.001056688;
export const MilliliterToPint: UnitConverter = (v) => v * 0.002113376;
export const MilliliterToFluidOunce: UnitConverter = (v) => v * 0.03381402;
export const MilliliterToLiter: UnitConverter = (v) => v * 0.001;

export const cupToTablespoon: UnitConverter = (v) => v * 16;
export const cupToTeaspoon: UnitConverter = (v) => v * 48;

export const tablespoonToCup: UnitConverter = (v) => v * 0.0625;
export const tablespoonToTeaspoon: UnitConverter = (v) => v * 3;

export const teaspoonToCup: UnitConverter = (v) => v * 0.0208333;
export const teaspoonToTablespoon: UnitConverter = (v) => v * 0.3333333;

export type UnitConverter = (amount: number) => number;

export function convert(amount: number, converter: UnitConverter) {}
