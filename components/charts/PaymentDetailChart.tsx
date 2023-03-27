import useFetchData from '@/hooks/useFetchData';
import { getPaymentDetailChartData } from '@/lib/chart.utils';
import { Loan } from '@/types/loan';
import { BarChart, Card, Title } from '@tremor/react';

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
    ReturnType<typeof getPaymentDetailChartData>
  >({
    queryKey: ['calculate-payment-detail-chart', loan],
    url: '/api/calculate-payment-detail-chart',
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
      <Title>Detalle de pago al principal e intereses</Title>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <BarChart
          className='mt-6'
          data={data}
          index='year'
          categories={['principal', 'interest']}
          colors={['emerald', 'rose']}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
          stack
        />
      )}
    </Card>
  );
};

export default AmortizationChart;
