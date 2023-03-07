import {
  calculateTotalInsurancePayments,
  calculateTotalInterest,
  calculateTotalPayment,
  roundAndFormat,
} from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import Card from '@/components/common/Card';
import * as React from 'react';
import MonthlyPaymentCard from './Cards/MonthlyPaymentCard';

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
        <MonthlyPaymentCard
          period={period}
          key={index}
          index={index}
          principal={principal}
          termInYears={termInYears}
          totalInsurancePerMonth={totalInsurancePerMonth}
        />
      ))}

      <Card
        label='Total en intereses'
        value={roundAndFormat(calculateTotalInterest(props.loan))}
      />

      {totalInsurancePerMonth > 0 && (
        <Card
          label='Total en seguros'
          value={roundAndFormat(calculateTotalInsurancePayments(props.loan))}
        />
      )}
      <Card
        label='Total a pagar'
        value={roundAndFormat(
          calculateTotalPayment(props.loan) +
            calculateTotalInsurancePayments(props.loan),
        )}
        tooltip='Total a pagar incluyendo monto del préstamo, intereses y seguros'
      />
    </div>
  );
};

export default LoanInfo;
