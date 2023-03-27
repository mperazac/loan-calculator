import useFetchData from '@/hooks/useFetchData';
import { getAmortizationChartData } from '@/lib/chart.utils';
import { Loan } from '@/types/loan';
import { Card, Title, AreaChart } from '@tremor/react';

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

  if (!data && !isLoading) {
    return null;
  }

  return (
    <Card>
      <Title>Pago de amortización y de intereses</Title>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <AreaChart
          className='h-72 mt-4'
          data={data}
          index='year'
          categories={['totalInterest', 'endingBalance']}
          colors={['slate', 'indigo']}
          valueFormatter={dataFormatter}
        />
      )}
    </Card>
  );
};

export default AmortizationChart;
