import useFetchData from '@/hooks/useFetchData';
import { calculateAllCosts, roundAndFormat } from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import { Card, DonutChart, Title } from '@tremor/react';

interface ITotalDonutChartProps {
  loan: Loan;
}

const TotalDonutChart: React.FunctionComponent<ITotalDonutChartProps> = ({
  loan,
}) => {
  const { data, isLoading } = useFetchData<
    ReturnType<typeof calculateAllCosts>
  >({
    queryKey: ['calculate-cards', loan],
    url: '/api/calculate-cards',
    params: { ...loan },
  });

  if (!data || isLoading) {
    return null;
  }

  const chartData = [
    {
      name: 'Intereses',
      amount: data.totalInterest,
    },
    {
      name: 'Seguros',
      amount: data.totalInsurance,
    },
    {
      name: 'Monto del préstamo',
      amount: loan.principal,
    },
  ];

  return (
    <Card>
      <Title>Total a pagar</Title>
      <DonutChart
        className='mt-6 lg:mt-12 lg:h-64'
        data={chartData}
        category='amount'
        index='name'
        valueFormatter={roundAndFormat}
        colors={['indigo', 'cyan', 'amber']}
      />
    </Card>
  );
};

export default TotalDonutChart;
