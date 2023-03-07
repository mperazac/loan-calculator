import { AmortizationRow, Loan } from './../types/loan';

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
export function calculateTotalInterest(loan: Loan) {
  const { principal = 0, periods, totalTermInYears } = loan;
  let totalInterest = 0;
  let balance = principal;
  let termInYearsLeft = totalTermInYears;

  periods.forEach(period => {
    const { termInYears, annualInterestRate } = period;
    const termInMonths = calculateLoanTermInMonths(termInYears);
    const monthlyPayment = calculateMonthlyPayment(
      balance,
      annualInterestRate,
      termInYearsLeft,
    );
    termInYearsLeft -= termInYears;
    const monthlyRate = calculateMonthlyInterestRate(annualInterestRate);
    const periodExtraPayment = period.extraPayment || 0;

    for (let i = 0; i < termInMonths && balance > 0; i++) {
      const interest = balance * monthlyRate;
      const payment = monthlyPayment + periodExtraPayment;
      totalInterest += interest;
      if (payment > balance + interest) {
        break;
      }
      const principalPayment = payment - interest;
      balance -= principalPayment;
    }
  });
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
export function calculateTotalPayment(loan: Loan) {
  const { principal, periods, totalTermInYears } = loan;
  let totalPayment = 0;
  let balance = principal;
  let termInYearsLeft = totalTermInYears;

  periods.forEach(period => {
    const { termInYears, annualInterestRate } = period;
    const termInMonths = calculateLoanTermInMonths(termInYears);
    const monthlyPayment = calculateMonthlyPayment(
      balance,
      annualInterestRate,
      termInYearsLeft,
    );
    termInYearsLeft -= termInYears;
    const monthlyRate = calculateMonthlyInterestRate(annualInterestRate);
    const periodExtraPayment = period.extraPayment || 0;

    for (let i = 0; i < termInMonths && balance > 0; i++) {
      const interest = balance * monthlyRate;
      const payment = monthlyPayment + periodExtraPayment;
      if (payment > balance + interest) {
        totalPayment += balance + interest;
        break;
      }
      const principalPayment = payment - interest;
      balance -= principalPayment;
      totalPayment += payment;
    }
  });

  return totalPayment;
}

// Generates a table of monthly payments for a loan
export function generateAmortizationSchedule(loan: Loan): AmortizationRow[] {
  const data: AmortizationRow[] = [];
  const { principal, periods, totalTermInYears } = loan;
  let month = 0;
  let balance = principal;
  let totalInterest = 0;
  let termInYearsLeft = totalTermInYears;

  periods.forEach(period => {
    const { termInYears, annualInterestRate } = period;
    const termInMonths = calculateLoanTermInMonths(termInYears);
    const monthlyPayment = calculateMonthlyPayment(
      balance,
      annualInterestRate,
      termInYearsLeft,
    );
    termInYearsLeft -= termInYears;
    const monthlyRate = calculateMonthlyInterestRate(annualInterestRate);
    const periodExtraPayment = period.extraPayment || 0;

    for (let i = 0; i < termInMonths; i++) {
      const interest = balance * monthlyRate;
      const payment = monthlyPayment + periodExtraPayment;
      totalInterest += interest;
      month += 1;
      if (payment > balance + interest) {
        data.push({
          month,
          startingBalance: balance,
          payment: balance + interest,
          interest,
          principal: balance,
          endingBalance: 0,
          totalInterest,
        });
        break;
      }
      const principalPayment = payment - interest;
      balance -= principalPayment;
      data.push({
        month,
        startingBalance: balance + principalPayment,
        payment,
        interest,
        principal: principalPayment,
        endingBalance: balance,
        totalInterest,
      });
    }
  });
  return data;
}

// Calculate the total payments for insurances in a loan
export function calculateTotalInsurancePayments(loan: Loan) {
  const {
    lifeInsurance = 0,
    fireInsurance = 0,
    jobLossInsurance = 0,
    periods,
    totalTermInYears,
    principal,
  } = loan;
  let totalInsurance = 0;
  let balance = principal;
  let termInYearsLeft = totalTermInYears;
  periods.forEach(period => {
    const { termInYears, annualInterestRate } = period;
    const termInMonths = calculateLoanTermInMonths(termInYears);
    const monthlyPayment = calculateMonthlyPayment(
      balance,
      annualInterestRate,
      termInYearsLeft,
    );
    termInYearsLeft -= termInYears;
    const monthlyRate = calculateMonthlyInterestRate(annualInterestRate);
    const periodExtraPayment = period.extraPayment || 0;

    for (let i = 0; i < termInMonths; i++) {
      const interest = balance * monthlyRate;
      const payment = monthlyPayment + periodExtraPayment;
      totalInsurance += lifeInsurance + fireInsurance + jobLossInsurance;
      if (payment > balance + interest) {
        break;
      }
      const principalPayment = payment - interest;
      balance -= principalPayment;
    }
  });
  return totalInsurance;
}
