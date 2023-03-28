import { roundAndFormat } from '@/lib/math.utils';
import { Card, Title, DonutChart } from '@tremor/react';

interface ITotalDonutChartProps {
  totalInterest: number;
  totalCost: number;
  totalInsurance: number;
  loanPrincipal: number;
}

const TotalDonutChart: React.FunctionComponent<
  ITotalDonutChartProps
> = props => {
  const data = [
    {
      name: 'Intereses',
      amount: props.totalInterest,
    },
    {
      name: 'Seguros',
      amount: props.totalInsurance,
    },
    {
      name: 'Monto del préstamo',
      amount: props.loanPrincipal,
    },
  ];
  return (
    <Card className='max-w-lg'>
      <Title>Totales a pagar</Title>
      <DonutChart
        className='mt-6'
        data={data}
        category='amount'
        index='name'
        valueFormatter={roundAndFormat}
        colors={['indigo', 'cyan', 'amber']}
      />
    </Card>
  );
};

export default TotalDonutChart;
