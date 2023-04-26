import {
	calculateMonthlyInterestRate,
	calculateMonthlyPayment,
	calculateTotalInterest,
	calculateLoanTermInMonths,
	calculateTotalCost,
	generateAmortizationSchedule,
	round,
	calculateTotalInsurancePayments,
} from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import { it, describe, expect } from 'vitest';

describe('Test all math operations', () => {
	const loan: Loan = {
		principal: 125000,
		totalTermInYears: 30,
		periods: [
			{
				termInYears: 30,
				annualInterestRate: 8.25,
			},
		],
	};

	it('calculates the montly interest rate', () => {
		const result = calculateMonthlyInterestRate(
			loan.periods[0].annualInterestRate,
		);
		expect(result).toBe(0.006875);
	});

	it('calculates the total number of payments', () => {
		const result = calculateLoanTermInMonths(loan.totalTermInYears);
		expect(result).toBe(360);
	});

	it('calculates the montly payment', () => {
		const result = calculateMonthlyPayment(
			loan.principal,
			loan.periods[0].annualInterestRate,
			loan.totalTermInYears,
		);
		expect(round(result)).toBe(939.08);
	});
	it('calculates the total interest', () => {
		const result = calculateTotalInterest(loan);
		expect(result).toBe(213069.97182291475);
	});
	it('calculates the total interest with extra monthly payments', () => {
		const loanWithExtraPayment: Loan = {
			principal: 125000,
			totalTermInYears: 30,
			periods: [
				{
					termInYears: 30,
					annualInterestRate: 8.25,
					extraPayment: 200,
				},
			],
		};
		const result = calculateTotalInterest(loanWithExtraPayment);
		expect(round(result)).toBe(108458.97);
	});
	it('calculates the total loan payment', () => {
		const result = calculateTotalCost(loan);
		expect(round(result)).toBe(338069.97);
	});
	it('calculates the total loan payment with extra montly payments', () => {
		const loanWithExtraPayment: Loan = {
			principal: 125000,
			totalTermInYears: 30,
			periods: [
				{
					termInYears: 30,
					annualInterestRate: 8.25,
					extraPayment: 200,
				},
			],
		};
		const result = calculateTotalCost(loanWithExtraPayment);
		expect(round(result)).toBe(233458.97);
	});
	it('generates a table of monthly payments', () => {
		const result = generateAmortizationSchedule(loan);
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
		const result = calculateTotalInsurancePayments({
			...loan,
			lifeInsurance,
			fireInsurance,
			jobLossInsurance,
		});
		expect(result).toBe(129600);
	});
});
