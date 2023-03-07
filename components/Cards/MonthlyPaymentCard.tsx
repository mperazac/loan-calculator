import { calculateMonthlyPayment, roundAndFormat } from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import * as React from 'react';
import Card from '../common/Card';

interface IMonthlyPaymentCardProps {
  period: Loan['periods'][number];
  principal: Loan['principal'];
  termInYears: Loan['totalTermInYears'];
  totalInsurancePerMonth: number;
  index: number;
}

const MonthlyPaymentCard: React.FunctionComponent<IMonthlyPaymentCardProps> = ({
  period,
  index,
  principal,
  termInYears,
  totalInsurancePerMonth,
}) => {
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    period.annualInterestRate,
    termInYears,
  );
  const periodExtraPayment = period.extraPayment || 0;
  return (
    <Card
      key={index}
      label={`Cuota mensual del periodo ${index + 1}`}
      value={roundAndFormat(
        monthlyPayment + totalInsurancePerMonth + periodExtraPayment,
      )}
      subText={
        <div className='gap-0'>
          {monthlyPayment > 0 && (
            <p>+ {roundAndFormat(monthlyPayment)} cuota</p>
          )}
          {totalInsurancePerMonth > 0 && (
            <p>+ {roundAndFormat(totalInsurancePerMonth)} seguros</p>
          )}
          {periodExtraPayment > 0 && (
            <p>+ {roundAndFormat(periodExtraPayment)} pago extra</p>
          )}
        </div>
      }
    />
  );
};

export default MonthlyPaymentCard;
