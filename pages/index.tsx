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

  function handleSubmit(loan: Loan) {
    setLoan(loan);
  }

  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <h1 className='text-4xl font-bold text-center mb-16'>
        Calculadora de crédito
      </h1>
      <Grid numCols={1} numColsSm={3} numColsLg={6} className='gap-2'>
        <Col numColSpan={1} numColSpanLg={6}>
          <Card>
            <LoanForm onSubmit={handleSubmit} />
          </Card>
        </Col>
      </Grid>

      {loan && (
        <div className='flex flex-col gap-4'>
          <CostCards loan={loan} />
          <PaymentDetailChart loan={loan} />
          <AmortizationTable loan={loan} />
        </div>
      )}
      {/* {loan && data && <TotalDonutChart {...data} loanPrincipal={loan.principal} />} */}
    </div>
  );
};

export default Home;
