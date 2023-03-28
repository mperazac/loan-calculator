import AmortizationTable from '@/components/AmortizationTable';
import PaymentDetailChart from '@/components/charts/PaymentDetailChart';
import AmortizationChart from '@/components/charts/AmortizationChart';
import CostCards from '@/components/CostCards';
import LoanForm from '@/components/LoanForm';
import useFetchData from '@/hooks/useFetchData';
import type { Loan, LoanCalculations } from '@/types/loan';
import { Card, Col, Grid } from '@tremor/react';

import type { NextPage } from 'next';
import { useState } from 'react';
import TotalDonutChart from '@/components/charts/TotalDonutChart';

const Home: NextPage = () => {
  const [loan, setLoan] = useState<Loan>();
  const { data, isLoading } = useFetchData<LoanCalculations>({
    queryKey: ['calculate-loan', loan],
    url: '/api/calculate-loan',
    params: { ...loan },
    reactQueryOptions: {
      enabled: !!loan,
    },
  });

  function handleSubmit(loan: Loan) {
    setLoan(loan);
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-center mb-16'>
        Calculadora de crédito
      </h1>
      <Grid numCols={1} numColsSm={3} numColsLg={6} className='gap-2'>
        <Col numColSpan={1} numColSpanLg={6}>
          <Card>
            <LoanForm onSubmit={handleSubmit} isLoading={isLoading}></LoanForm>
          </Card>
        </Col>
      </Grid>

      {data && (
        <div className='flex flex-col gap-4'>
          <CostCards data={data} />
          {/* <AmortizationTable data={data.amortizationSchedule} /> */}
        </div>
      )}
      {loan && data && <TotalDonutChart {...data} loanPrincipal={loan.principal} />}
      {loan && <PaymentDetailChart loan={loan} />}
      {loan && <AmortizationChart loan={loan} />}
    </>
  );
};

export default Home;
