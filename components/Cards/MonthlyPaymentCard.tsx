import { roundAndFormat } from '@/lib/math.utils';
import { Text } from '@tremor/react';
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
        <div className='gap-0 mt-1'>
          {totalInsurancePerMonth !== 0 && extraPayment !== 0 && (
            <Text>{roundAndFormat(monthlyPayment)} cuota</Text>
          )}
          {totalInsurancePerMonth > 0 && (
            <Text>+ {roundAndFormat(totalInsurancePerMonth)} seguros</Text>
          )}
          {extraPayment > 0 && (
            <Text>+ {roundAndFormat(extraPayment)} pago extra</Text>
          )}
        </div>
      }
    />
  );
};

export default MonthlyPaymentCard;
