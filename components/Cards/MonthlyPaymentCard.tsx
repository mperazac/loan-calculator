import { roundAndFormat } from '@/lib/math.utils';
import * as React from 'react';
import Card from '../common/Card';

interface IMonthlyPaymentCardProps {
  monthlyPayment: number;

  totalInsurancePerMonth: number;
  extraPayment: number;
  period: number;
}

const MonthlyPaymentCard: React.FunctionComponent<IMonthlyPaymentCardProps> = ({
  monthlyPayment,
  period,
  totalInsurancePerMonth,
  extraPayment = 0,
}) => {
  return (
    <Card
      key={period}
      label={`Cuota mensual del periodo ${period}`}
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
