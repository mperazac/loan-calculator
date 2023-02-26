import {
  calculateMonthlyInterestRate,
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateLoanTermInMonths,
  calculateTotalPayment,
  generateAmortizationSchedule,
  round,
} from '@/lib/math.utils';
import { it, describe, expect } from 'vitest';

describe('Test all math operations', () => {
  const principal = 125000;
  const interestRate = 8.25;
  const termInYears = 30;

  it('calculates the montly interest rate', () => {
    const result = calculateMonthlyInterestRate(interestRate);
    expect(result).toBe(0.006875);
  });

  it('calculates the total number of payments', () => {
    const result = calculateLoanTermInMonths(termInYears);
    expect(result).toBe(360);
  });

  it('calculates the montly payment', () => {
    const result = calculateMonthlyPayment(
      principal,
      interestRate,
      termInYears,
    );
    expect(result).toBe(939.0832550636559);
  });
  it('calculates the total interest', () => {
    const result = calculateTotalInterest(principal, interestRate, termInYears);
    expect(result).toBe(213069.97182291612);
  });
  it('calculates the total loan payment', () => {
    const result = calculateTotalPayment(principal, interestRate, termInYears);
    expect(result).toBe(338069.9718229161);
  });
  it('generates a table of monthly payments', () => {
    const result = generateAmortizationSchedule(
      principal,
      interestRate,
      termInYears,
    );
    expect(result.length).toBe(360);
    expect(result[0].month).toBe(1);
    expect(round(result[0].startingBalance)).toBe(125000);
    expect(round(result[0].payment)).toBe(939.08);
    expect(round(result[0].interest)).toBe(859.38);
    expect(round(result[0].principal)).toBe(79.71);
    expect(round(result[0].endingBalance)).toBe(124920.29);
    expect(round(result[0].totalInterest)).toBe(859.38);
    expect(round(result[359].month)).toBe(360);
  });
});
