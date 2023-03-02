import {
  calculateMonthlyInterestRate,
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateLoanTermInMonths,
  calculateTotalPayment,
  generateAmortizationSchedule,
  round,
  calculateTotalInsurancePayments,
} from '@/lib/math.utils';
import { it, describe, expect } from 'vitest';

describe('Test all math operations', () => {
  const principal = 125000;
  const interestRate = 8.25;
  const termInYears = 30;
  const extraMonthlyPayment = 200;

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
    expect(round(result)).toBe(939.08);
  });
  it('calculates the total interest', () => {
    const result = calculateTotalInterest(
      principal,
      interestRate,
      0,
      termInYears,
      0,
      0,
    );
    expect(result).toBe(213069.97182291475);
  });
  it('calculates the total interest with extra monthly payments', () => {
    const result = calculateTotalInterest(
      principal,
      interestRate,
      0,
      termInYears,
      0,
      extraMonthlyPayment,
    );
    expect(result).toBe(108458.96960231283);
  });
  it('calculates the total loan payment', () => {
    const result = calculateTotalPayment(
      principal,
      interestRate,
      0,
      termInYears,
      0,
      0,
    );
    expect(round(result)).toBe(338069.97);
  });
  it('calculates the total loan payment with extra montly payments', () => {
    const result = calculateTotalPayment(
      principal,
      interestRate,
      0,
      termInYears,
      0,
      200,
    );
    expect(round(result)).toBe(233458.97);
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
  it('Calculate the total payments for insurances in a loan', () => {
    const lifeInsurance = 120;
    const fireInsurance = 140;
    const jobLossInsurance = 100;
    const result = calculateTotalInsurancePayments(
      termInYears,
      lifeInsurance,
      fireInsurance,
      jobLossInsurance,
    );
    expect(result).toBe(129600);
  });
});
