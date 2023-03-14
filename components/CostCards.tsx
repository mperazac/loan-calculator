import Card from '@/components/common/Card';
import { roundAndFormat } from '@/lib/math.utils';
import type { Loan, LoanCalculations } from '@/types/loan';
import * as React from 'react';
import MonthlyPaymentCard from './Cards/MonthlyPaymentCard';

type CostCardsProps = {
  data: LoanCalculations;
};

const CostCards: React.FunctionComponent<CostCardsProps> = ({ data }) => {
  return (
    <div className='mt-10 flex gap-5'>
      {data.monthlyPaymentsPerPeriods.map((mp, index) => (
        <MonthlyPaymentCard
          key={index}
          period={index + 1}
          monthlyPayment={mp.monthlyPayment}
          extraPayment={mp.extraPayment}
          totalInsurancePerMonth={data.totalInsurancePerMonth}
        />
      ))}

      <Card
        label='Total en intereses'
        value={roundAndFormat(data.totalInterest)}
      />

      {data.totalInsurancePerMonth > 0 && (
        <Card
          label='Total en seguros'
          value={roundAndFormat(data.totalInsurance)}
        />
      )}
      <Card
        label='Total a pagar'
        value={roundAndFormat(data.totalCost)}
        tooltip='Total a pagar incluyendo monto del préstamo, intereses y seguros'
      />
    </div>
  );
};

export default CostCards;
