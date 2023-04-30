import * as React from 'react';
import Card from '../common/Card';
import { getBadgeProps } from '@/lib/helpers';

interface IDebtTermCardProps {
	total: number;
	difference: number;
	percentage: number;
	isLoading?: boolean;
}

const DebtTermCard: React.FunctionComponent<IDebtTermCardProps> = props => {
	const { total, isLoading } = props;
	const years = Math.floor(total / 12);
	const remainingMonths = total % 12;

	return (
		<Card
			label='Años para pagar'
			value={`${years} años ${
				remainingMonths > 0 ? `y ${remainingMonths} meses` : ''
			}`}
			subText={props.difference ? `Ahorro de ${props.difference} meses` : ''}
			badgeProps={getBadgeProps(props)}
			isLoading={isLoading}
		/>
	);
};

export default DebtTermCard;
