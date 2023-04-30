import Card from '@/components/common/Card';
import useFetchData from '@/hooks/useFetchData';
import { getBadgeProps } from '@/lib/helpers';
import { getCardsData, roundAndFormat } from '@/lib/math.utils';
import type { Loan } from '@/types/loan';
import * as React from 'react';
import DebtTermCard from './Cards/DebtTermCard';
import MonthlyPaymentCard from './Cards/MonthlyPaymentCard';

type CostCardsProps = {
	loan: Loan;
};

const DEFAULT_PERIOD_CARDS_TOTAL = 3;
const DEFAULT_CARDS_TOTAL = 4;

const CostCards: React.FunctionComponent<CostCardsProps> = ({ loan }) => {
	const { data, isLoading } = useFetchData<ReturnType<typeof getCardsData>>({
		queryKey: ['calculate-cards', loan],
		url: '/api/calculate-cards',
		params: { ...loan },
	});

	function getCardSize() {
		if (!loan || loan.periods.length < 3) {
			return DEFAULT_PERIOD_CARDS_TOTAL;
		}

		return loan.periods.length;
	}

	function isInsuranceEnabled() {
		const { fireInsurance = 0, lifeInsurance = 0, jobLossInsurance = 0 } = loan;
		return fireInsurance > 0 || lifeInsurance > 0 || jobLossInsurance > 0;
	}

	if (isLoading) {
		return (
			<>
				<div
					className={`grid grid-cols-${getCardSize()} gap-4 md:gap-8 mb-4 md:mb-8`}
				>
					{loan.periods.map((mp, index) => (
						<Card
							isLoading={isLoading}
							key={index}
							isLoadingOrientation='horizontal'
						/>
					))}
				</div>
				<div
					className={`grid grid-cols-2 md:grid-cols-${DEFAULT_CARDS_TOTAL} gap-4 md:gap-8 mb-4 md:mb-8`}
				>
					<Card isLoading={isLoading} isLoadingOrientation='horizontal' />

					{isInsuranceEnabled() && (
						<Card isLoading={isLoading} isLoadingOrientation='horizontal' />
					)}
					<Card isLoading={isLoading} isLoadingOrientation='horizontal' />
					<Card isLoading={isLoading} isLoadingOrientation='horizontal' />
				</div>
			</>
		);
	}

	if (!data) {
		return null;
	}

	return (
		<>
			<div
				className={`grid grid-cols-${getCardSize()} gap-4 md:gap-8 mb-4 md:mb-8`}
			>
				{data.monthlyPaymentsPerPeriods.map((mp, index) => (
					<MonthlyPaymentCard
						key={index}
						period={index + 1}
						monthlyPayment={mp.payment}
						extraPayment={mp.extraPayment}
						totalInsurancePerMonth={data.monthlyInsurancePayment}
					/>
				))}
			</div>
			<div
				className={`grid grid-cols-2 md:grid-cols-${DEFAULT_CARDS_TOTAL} gap-4 md:gap-8 mb-4 md:mb-8`}
			>
				<Card
					label='Total en intereses'
					value={roundAndFormat(data.totalInterest.total)}
					badgeProps={getBadgeProps(data.totalInterest)}
					subText={
						data.totalInterest.difference
							? `Ahorro de ${roundAndFormat(data.totalInterest.difference)}`
							: undefined
					}
				/>

				{data.monthlyInsurancePayment > 0 && (
					<Card
						label='Total en seguros'
						value={roundAndFormat(data.totalInsurance.total)}
						badgeProps={getBadgeProps(data.totalInsurance)}
						subText={
							data.totalInsurance.difference
								? `Ahorro de ${roundAndFormat(data.totalInsurance.difference)}`
								: undefined
						}
					/>
				)}
				<Card
					label='Total a pagar'
					value={roundAndFormat(data.totalCost.total)}
					tooltip='Total a pagar incluyendo monto del préstamo, intereses y seguros'
					badgeProps={getBadgeProps(data.totalCost)}
					subText={
						data.totalCost.difference
							? `Ahorro de ${roundAndFormat(data.totalCost.difference)}`
							: undefined
					}
				/>
				<DebtTermCard {...data.totalMonths} />
			</div>
		</>
	);
};

export default CostCards;
