import { calculateMonthlyPayment, roundAndFormat } from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import * as React from 'react';
import Card from '../common/Card';

interface IMonthlyPaymentCardProps {
  period: Loan['periods'][number];
  principal: Loan['principal'];
  termInYears: Loan['totalTermInYears'];
  totalInsurancePerMonth: number;
  extraPayment: Loan['extraPayment'];
  index: number;
}

const MonthlyPaymentCard: React.FunctionComponent<IMonthlyPaymentCardProps> = ({
  period,
  index,
  principal,
  termInYears,
  totalInsurancePerMonth,
  extraPayment = 0,
}) => {
  const monthlyPayment = calculateMonthlyPayment(
    principal,
    period.annualInterestRate,
    termInYears,
  );
  return (
    <Card
      key={index}
      label={`Cuota mensual del periodo ${index + 1}`}
      value={roundAndFormat(
        monthlyPayment + totalInsurancePerMonth + extraPayment,
      )}
      subText={
        <div className='gap-0'>
          {monthlyPayment > 0 && (
            <p>+ {roundAndFormat(monthlyPayment)} cuota</p>
          )}
          {totalInsurancePerMonth > 0 && (
            <p>+ {roundAndFormat(totalInsurancePerMonth)} seguros</p>
          )}
          {extraPayment > 0 && (
            <p>+ {roundAndFormat(extraPayment)} pago extra</p>
          )}
        </div>
      }
    />
  );
};

export default MonthlyPaymentCard;
