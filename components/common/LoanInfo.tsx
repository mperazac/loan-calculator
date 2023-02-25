import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateTotalPayment,
  roundAndFormat,
} from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import { Card } from 'flowbite-react';
import * as React from 'react';

type LoanInfoProps = {} & Loan;

const LoanInfo: React.FunctionComponent<LoanInfoProps> = props => {
  const {
    principal,
    fixedRate = 0,
    fixedTerm = 0,
    variableRate,
    loanTermInYears: term,
    extraPayment,
  } = props;

  /* const arrayOfMonths: Array<number> = R.times(
    R.identity,
    fixedTerm * MONTHS_PER_YEAR,
  );
  const amountAfterFixedPaymentsTerm = R.reduce(
    (_amount: number) => {
      const montlyPayment = calculateMontlyPayment(
        _amount,
        fixedMontlyInterestRate,
        fixedRateTotalNumberOfPayments,
      );
      return _amount - (montlyPayment - _amount * fixedMontlyInterestRate);
    },
    amount,
    arrayOfMonths,
  ); */

  return (
    <div className='mt-10 flex gap-5'>
      <Card className=' w-60'>
        <h5 className='text-xl text-gray-700 tracking-tight  dark:text-white'>
          Pago mensual
        </h5>
        <p className='text-2xl font-bold text-gray-900 dark:text-gray-400'>
          {roundAndFormat(
            calculateMonthlyPayment(principal, fixedRate, fixedTerm),
          )}
        </p>
      </Card>
      <Card className=' w-60'>
        <h5 className='text-xl text-gray-700 tracking-tight  dark:text-white'>
          Total en intereses
        </h5>
        <p className='text-2xl font-bold text-gray-900 dark:text-gray-400'>
          {roundAndFormat(
            calculateTotalInterest(principal, fixedRate, fixedTerm),
          )}
        </p>
      </Card>
      <Card className=' w-60'>
        <h5 className='text-xl text-gray-700 tracking-tight  dark:text-white'>
          Total al final del plazo
        </h5>
        <p className='text-2xl font-bold text-gray-900 dark:text-gray-400'>
          {roundAndFormat(
            calculateTotalPayment(principal, fixedRate, fixedTerm),
          )}
        </p>
      </Card>
    </div>
  );
};

export default LoanInfo;
