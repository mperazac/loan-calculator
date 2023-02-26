import { AmortizationRow } from './../types/loan';
const MONTHS_PER_YEAR = 12;

export function calculateMonthlyInterestRate(interestRate: number) {
  return interestRate / 100 / MONTHS_PER_YEAR;
}

// Calculates the total number of payments of a loan
export function calculateLoanTermInMonths(term: number) {
  return term * MONTHS_PER_YEAR;
}

// Calculates the total interest of a loan
export function calculateTotalInterest(
  principal: number,
  interestRate: number,
  loanTermInYears: number,
) {
  const loanTermInMonths = calculateLoanTermInMonths(loanTermInYears);
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    loanTermInYears,
  );
  const totalPayment = monthlyPayment * loanTermInMonths;
  const totalInterest = totalPayment - principal;
  return totalInterest;
}

export function round(x: number) {
  return Math.round(x * 100) / 100;
}

export function roundAndFormat(x: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(round(x));
}

// Calculates the montly payment of a loan
export function calculateMonthlyPayment(
  principal: number,
  interestRate: number,
  loanTermInYears: number,
): number {
  const monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
  const loanTermInMonths = calculateLoanTermInMonths(loanTermInYears);
  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTermInMonths));
  return monthlyPayment;
}

// Calculates the total payment of a loan
export function calculateTotalPayment(
  principal: number,
  interestRate: number,
  loanTermInYears: number,
) {
  const loanTermInMonths = calculateLoanTermInMonths(loanTermInYears);
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    loanTermInYears,
  );
  const totalPayment = monthlyPayment * loanTermInMonths;
  return totalPayment;
}

// Generates a table of monthly payments for a loan
export function generateAmortizationSchedule(
  principal: number,
  interestRate: number,
  loanTermInYears: number,
): AmortizationRow[] {
  const data = [];
  const monthlyRate = calculateMonthlyInterestRate(interestRate);
  const numberOfPayments = calculateLoanTermInMonths(loanTermInYears);
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    loanTermInYears,
  );
  let balance = principal;
  let totalInterest = 0;
  for (let i = 0; i < numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = balance - principal;
    totalInterest += interest;
    data.push({
      month: i + 1,
      startingBalance: balance + principal,
      payment: monthlyPayment,
      interest,
      principal,
      endingBalance: balance,
      totalInterest,
    });
  }
  return data;
}
