import * as React from 'react';
import Card from '../common/Card';

interface IDebtTermCardProps {
  totalMonths: number;
}

const DebtTermCard: React.FunctionComponent<IDebtTermCardProps> = ({
  totalMonths,
}) => {
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  return (
    <Card
      label='Años para pagar'
      value={`${years} años`}
      subText={remainingMonths > 0 ? `y ${remainingMonths} meses` : undefined}
    />
  );
};

export default DebtTermCard;
