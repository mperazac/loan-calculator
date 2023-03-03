import {
  calculateMonthlyPayment,
  calculateTotalInsurancePayments,
  calculateTotalInterest,
  calculateTotalPayment,
  roundAndFormat,
} from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import Card from '@/components/common/Card';
import * as React from 'react';

type LoanInfoProps = {
  loan: Loan;
};

const LoanInfo: React.FunctionComponent<LoanInfoProps> = props => {
  const {
    principal,
    periods,
    totalTermInYears: termInYears,
    lifeInsurance = 0,
    fireInsurance = 0,
    jobLossInsurance = 0,
  } = props.loan;
  const totalInsurancePerMonth =
    lifeInsurance + fireInsurance + jobLossInsurance;
  return (
    <div className='mt-10 flex gap-5'>
      {periods.map((period, index) => (
        <>
          <Card
            key={index}
            label={`Cuota mensual del periodo ${index + 1}`}
            value={roundAndFormat(
              calculateMonthlyPayment(
                principal,
                period.annualInterestRate,
                termInYears,
              ),
            )}
          />
          {totalInsurancePerMonth > 0 && (
            <Card
              key={index}
              label={`Cuota mensual con seguros del periodo ${index + 1}`}
              value={roundAndFormat(
                calculateMonthlyPayment(
                  principal,
                  period.annualInterestRate,
                  period.termInYears,
                ) + totalInsurancePerMonth,
              )}
            />
          )}
        </>
      ))}

      <Card
        label='Total en intereses'
        value={roundAndFormat(calculateTotalInterest(props.loan))}
      />

      {totalInsurancePerMonth > 0 && (
        <Card
          label='Total en seguros'
          value={roundAndFormat(
            calculateTotalInsurancePayments(
              termInYears,
              lifeInsurance,
              fireInsurance,
              jobLossInsurance,
            ),
          )}
        />
      )}
      <Card
        label='Total a pagar'
        value={roundAndFormat(
          calculateTotalPayment(props.loan) +
            calculateTotalInsurancePayments(
              termInYears,
              lifeInsurance,
              fireInsurance,
              jobLossInsurance,
            ),
        )}
        tooltip='Total a pagar incluyendo monto del préstamo, intereses y seguros'
      />
    </div>
  );
};

export default LoanInfo;
