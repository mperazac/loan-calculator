import {
  calculateMonthlyPayment,
  calculateTotalInsurancePayments,
  calculateTotalInterest,
  calculateTotalPayment,
  roundAndFormat,
} from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import { Card } from 'flowbite-react';
import * as React from 'react';

type LoanInfoProps = Loan;

const LoanInfo: React.FunctionComponent<LoanInfoProps> = props => {
  const {
    principal,
    fixedRate = 0,
    termInYears,
    lifeInsurance = 0,
    fireInsurance = 0,
    jobLossInsurance = 0,
    extraPayment = 0,
  } = props;
  const totalInsurancePerMonth =
    lifeInsurance + fireInsurance + jobLossInsurance;
  return (
    <div className='mt-10 flex gap-5'>
      <Card className=' w-60'>
        <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase'>
          Cuota mensual
        </h5>
        <p className='text-2xl text-gray-900 dark:text-gray-400'>
          {roundAndFormat(
            calculateMonthlyPayment(principal, fixedRate, termInYears),
          )}
        </p>
      </Card>
      {totalInsurancePerMonth > 0 && (
        <Card className=' w-60'>
          <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase'>
            Cuota mensual con seguros
          </h5>
          <p className='text-2xl text-gray-900 dark:text-gray-400'>
            {roundAndFormat(
              calculateMonthlyPayment(principal, fixedRate, termInYears) +
                totalInsurancePerMonth,
            )}
          </p>
        </Card>
      )}
      <Card className=' w-60'>
        <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase'>
          Total en intereses
        </h5>
        <p className='text-2xl text-gray-900 dark:text-gray-400'>
          {roundAndFormat(
            calculateTotalInterest(
              principal,
              fixedRate,
              termInYears,
              extraPayment,
            ),
          )}
        </p>
      </Card>
      {totalInsurancePerMonth > 0 && (
        <Card className=' w-60'>
          <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase'>
            Total en seguros
          </h5>
          <p className='text-2xl text-gray-900 dark:text-gray-400'>
            {roundAndFormat(
              calculateTotalInsurancePayments(
                termInYears,
                lifeInsurance,
                fireInsurance,
                jobLossInsurance,
              ),
            )}
          </p>
        </Card>
      )}
      <Card className=' w-60'>
        <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase'>
          Total a pagar
        </h5>
        <p className='text-2xl text-gray-900 dark:text-gray-400'>
          {roundAndFormat(
            calculateTotalPayment(
              principal,
              fixedRate,
              termInYears,
              extraPayment,
            ) +
              calculateTotalInsurancePayments(
                termInYears,
                lifeInsurance,
                fireInsurance,
                jobLossInsurance,
              ),
          )}
        </p>
      </Card>
    </div>
  );
};

export default LoanInfo;
