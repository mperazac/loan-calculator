import {
  calculateMonthlyInterestRate,
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateLoanTermInMonths,
  calculateTotalPayment,
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
});
