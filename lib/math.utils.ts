import { AmortizationRow } from './../types/loan';
const MONTHS_PER_YEAR = 12;

export function round(x: number) {
  return Math.round(x * 100) / 100;
}

export function roundAndFormat(x: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(round(x));
}

export function calculateMonthlyInterestRate(interestRate: number) {
  return interestRate / MONTHS_PER_YEAR / 100;
}

// Calculates the total number of payments of a loan
export function calculateLoanTermInMonths(term: number) {
  return term * MONTHS_PER_YEAR;
}

// Calculates the total interest of a loan
export function calculateTotalInterest(
  principal: number,
  interestRate: number,
  termInYears: number,
  extraMonthlyPayment: number,
) {
  const termInMonths = calculateLoanTermInMonths(termInYears);
  const monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    termInYears,
  );

  let balance = principal;
  let totalInterest = 0;

  for (let i = 0; i < termInMonths && balance > 0; i++) {
    const interest = balance * monthlyInterestRate;
    const payment = monthlyPayment + extraMonthlyPayment;
    const principalPaid = payment - interest;
    balance -= principalPaid;
    totalInterest += interest;
  }

  return totalInterest;
}

// Calculates the montly payment of a loan
export function calculateMonthlyPayment(
  principal: number,
  interestRate: number,
  termInYears: number,
  extraMonthlyPayment: number = 0,
): number {
  const termInMonths = calculateLoanTermInMonths(termInYears);
  const monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
  const denominator = 1 - Math.pow(1 + monthlyInterestRate, -termInMonths);
  const monthlyPayment = (principal * monthlyInterestRate) / denominator;

  return monthlyPayment + extraMonthlyPayment;
}

// Calculates the total payment of a loan
export function calculateTotalPayment(
  principal: number,
  interestRate: number,
  termInYears: number,
  extraMonthlyPayment: number,
) {
  const termInMonths = calculateLoanTermInMonths(termInYears);
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    termInYears,
  );
  if (extraMonthlyPayment > 0) {
    let totalPaid = 0;
    let balance = principal;

    for (let i = 0; i < termInMonths && balance > 0; i++) {
      const interest = balance * (interestRate / 100 / 12);
      const payment = monthlyPayment + extraMonthlyPayment;
      if (payment > balance + interest) {
        totalPaid += balance + interest;
        break;
      }
      const principalPaid = payment - interest;
      totalPaid += payment;
      balance -= principalPaid;
    }

    return totalPaid;
  }
  const totalPayment = monthlyPayment * termInMonths;
  return totalPayment;
}

// Generates a table of monthly payments for a loan
export function generateAmortizationSchedule(
  principal: number,
  interestRate: number,
  termInYears: number,
  extraMonthlyPayment?: number,
): AmortizationRow[] {
  const data = [];
  const monthlyRate = calculateMonthlyInterestRate(interestRate);
  const numberOfPayments = calculateLoanTermInMonths(termInYears);
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    interestRate,
    termInYears,
    extraMonthlyPayment,
  );
  let balance = principal;
  let totalInterest = 0;
  for (let i = 0; i < numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    if (monthlyPayment > balance + interest) {
      data.push({
        month: i + 1,
        startingBalance: balance,
        payment: balance + interest,
        interest,
        principal: balance,
        endingBalance: 0,
        totalInterest: totalInterest + interest,
      });
      break;
    }
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

// Calculate the total payments for insurances in a loan
export function calculateTotalInsurancePayments(
  termInYears: number,
  lifeInsurance = 0,
  fireInsurance = 0,
  jobLossInsurance = 0,
) {
  return (
    termInYears *
    MONTHS_PER_YEAR *
    (lifeInsurance + fireInsurance + jobLossInsurance)
  );
}
