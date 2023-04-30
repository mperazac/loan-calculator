import useFetchData from '@/hooks/useFetchData';
import { getAmortizationChartData } from '@/lib/chart.utils';
import { Loan } from '@/types/loan';
import { Card as TremorCard, LineChart, Title } from '@tremor/react';
import Skeleton from '../Skeleton';

interface IAmortizationChartProps {
	loan: Loan;
}

const dataFormatter = (number: number) => {
	return '$ ' + Intl.NumberFormat('us').format(number).toString();
};

const AmortizationChart: React.FunctionComponent<IAmortizationChartProps> = ({
	loan,
}) => {
	const { data, isLoading } = useFetchData<
		ReturnType<typeof getAmortizationChartData>
	>({
		queryKey: ['calculate-amortization-chart', loan],
		url: '/api/calculate-amortization-chart',
		params: { ...loan },
		reactQueryOptions: {
			enabled: !!loan,
		},
	});

	if (isLoading) {
		return <Skeleton />;
	}

	if (!data) {
		return null;
	}

	return (
		<TremorCard decoration='top' decorationColor='indigo'>
			<Title>Pago de amortización y de intereses</Title>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<LineChart
					className='mt-4 h-72'
					data={data}
					index='year'
					categories={['Interes', 'Saldo Capital']}
					colors={['slate', 'indigo']}
					valueFormatter={dataFormatter}
					yAxisWidth={75}
				/>
			)}
		</TremorCard>
	);
};

export default AmortizationChart;
