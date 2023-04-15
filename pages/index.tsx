import AmortizationTable from '@/components/AmortizationTable';
import CostCards from '@/components/CostCards';
import LoanForm from '@/components/LoanForm';
import AmortizationChart from '@/components/charts/AmortizationChart';
import PaymentDetailChart from '@/components/charts/PaymentDetailChart';
import TotalDonutChart from '@/components/charts/TotalDonutChart';
import type { Loan } from '@/types/loan';

import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [loan, setLoan] = useState<Loan>();

  function handleSubmit(loan: Loan) {
    setLoan(loan);
  }

  return (
    <>
      <div className='flex flex-col items-center mb-4 lg:min-h-screen lg:justify-center lg:mb-8'>
        <h1 className='mb-16 text-4xl font-bold text-center'>
          Calculadora de crédito
        </h1>
        <LoanForm onSubmit={handleSubmit} />
      </div>
      {loan && (
        <div>
          <CostCards loan={loan} />
          <div className='grid grid-cols-1 gap-4 mb-4 md:gap-8 lg:space-y-0 lg:grid-cols-3 md:mb-8'>
            <TotalDonutChart loan={loan} />
            <div className='col-span-2'>
              <PaymentDetailChart loan={loan} />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 mb-4 md:gap-8 lg:space-y-0 lg:grid-cols-3 md:mb-8'>
            <div className='col-span-2'>
              <AmortizationChart loan={loan} />
            </div>
          </div>
          <AmortizationTable loan={loan} />
        </div>
      )}
    </>
  );
};

export default Home;
