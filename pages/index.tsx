import AmortizationTable from '@/components/AmortizationTable';
import CostCards from '@/components/CostCards';
import LoanForm from '@/components/LoanForm';
import AmortizationChart from '@/components/charts/AmortizationChart';
import PaymentDetailChart from '@/components/charts/PaymentDetailChart';
import TotalDonutChart from '@/components/charts/TotalDonutChart';
import type { Loan } from '@/types/loan';


import type { NextPage } from 'next';
import { useState } from 'react';

const DEFAULT_CARDS_TOTAL = 4;

const Home: NextPage = () => {
  const [loan, setLoan] = useState<Loan>();

  function handleSubmit(loan: Loan) {
    setLoan(loan);
  }

  function getCardSize() {
    if (!loan) {
      return DEFAULT_CARDS_TOTAL;
    }

    const { periods } = loan;

    if (periods.length > 1) {
      if (periods.length + DEFAULT_CARDS_TOTAL > 6) {
        return 6;
      }
      return DEFAULT_CARDS_TOTAL + 1;
    }

    return DEFAULT_CARDS_TOTAL;
  }

  return (
    <>
      <div className='lg:min-h-screen flex lg:justify-center items-center flex-col mb-4 lg:mb-8'>
        <h1 className='text-4xl font-bold text-center mb-16'>
          Calculadora de crédito
        </h1>
        <LoanForm onSubmit={handleSubmit} />
      </div>
      {loan && (
        <div>
          <div
            className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-${getCardSize()} gap-4 md:gap-8 mb-4 md:mb-8`}
          >
            <CostCards loan={loan} />
          </div>
          <div className='grid grid-cols-1 gap-4 md:gap-8 lg:space-y-0 lg:grid-cols-3 mb-4 md:mb-8'>
            <TotalDonutChart loan={loan} />
            <div className='col-span-2'>
              <PaymentDetailChart loan={loan} />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:gap-8 lg:space-y-0 lg:grid-cols-3 mb-4 md:mb-8'>
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
