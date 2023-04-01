import Card from '@/components/common/Card';
import useFetchData from '@/hooks/useFetchData';
import { calculateAllCards, round, roundAndFormat } from '@/lib/math.utils';
import type { Loan } from '@/types/loan';
import * as React from 'react';
import MonthlyPaymentCard from './Cards/MonthlyPaymentCard';

type CostCardsProps = {
  loan: Loan;
};

const CostCards: React.FunctionComponent<CostCardsProps> = ({ loan }) => {
  const { data, isLoading } = useFetchData<
    ReturnType<typeof calculateAllCards>
  >({
    queryKey: ['calculate-cards', loan],
    url: '/api/calculate-cards',
    params: { ...loan },
  });

  if (!data || isLoading) {
    return null;
  }

  return (
    <div className='mt-10 flex gap-5'>
      {data.monthlyPaymentsPerPeriods.map((mp, index) => (
        <MonthlyPaymentCard
          key={index}
          period={index + 1}
          monthlyPayment={mp.payment}
          extraPayment={mp.extraPayment}
          totalInsurancePerMonth={data.monthlyInsurancePayment}
        />
      ))}

      <Card
        label='Total en intereses'
        value={roundAndFormat(data.totalInterest)}
      />

      {data.monthlyInsurancePayment > 0 && (
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
      <Card
        label='Años para pagar'
        value={round(data.totalMonths / 12).toString()}
      />
    </div>
  );
};

export default CostCards;
