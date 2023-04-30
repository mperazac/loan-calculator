import useFetchData from '@/hooks/useFetchData';
import { getCardsData, roundAndFormat } from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import { Card as TremorCard, DonutChart, Title } from '@tremor/react';
import Skeleton from '../Skeleton';

interface ITotalDonutChartProps {
	loan: Loan;
}

const TotalDonutChart: React.FunctionComponent<ITotalDonutChartProps> = ({
	loan,
}) => {
	const { data, isLoading } = useFetchData<ReturnType<typeof getCardsData>>({
		queryKey: ['calculate-cards', loan],
		url: '/api/calculate-cards',
		params: { ...loan },
	});

	if (isLoading) {
		return <Skeleton />;
	}

	if (!data) {
		return null;
	}

	const chartData = [
		{
			name: 'Intereses',
			amount: data.totalInterest.total,
		},
		{
			name: 'Seguros',
			amount: data.totalInsurance.total,
		},
		{
			name: 'Monto del préstamo',
			amount: loan.principal,
		},
	];

	return (
		<TremorCard decoration='top' decorationColor='indigo'>
			<Title>Total a pagar</Title>
			<DonutChart
				className='mt-6 lg:mt-12 lg:h-64'
				data={chartData}
				category='amount'
				index='name'
				valueFormatter={roundAndFormat}
				colors={['indigo', 'cyan', 'amber']}
			/>
		</TremorCard>
	);
};

export default TotalDonutChart;
