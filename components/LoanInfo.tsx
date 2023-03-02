import {
  calculateMonthlyPayment,
  calculateTotalInsurancePayments,
  calculateTotalInterest,
  calculateTotalPayment,
  roundAndFormat,
} from '@/lib/math.utils';
import { Loan } from '@/types/loan';
import Card from '@/components/common/Card';
import * as React from 'react';

type LoanInfoProps = Loan;

const LoanInfo: React.FunctionComponent<LoanInfoProps> = props => {
  const {
    principal,
    fixedRate = 0,
    fixedTerm = 0,
    variableRate = 0,
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
      <Card
        label='Cuota mensual con tasa fija'
        value={roundAndFormat(
          calculateMonthlyPayment(principal, fixedRate, termInYears),
        )}
      />
      {variableRate > 0 && (
        <Card
          label='Cuota mensual con tasa variable'
          value={roundAndFormat(
            calculateMonthlyPayment(principal, variableRate, termInYears),
          )}
        />
      )}
      {totalInsurancePerMonth > 0 && (
        <Card
          label='Cuota mensual con seguros'
          value={roundAndFormat(
            calculateMonthlyPayment(principal, fixedRate, termInYears) +
              totalInsurancePerMonth,
          )}
        />
      )}
      <Card
        label='Total en intereses'
        value={roundAndFormat(
          calculateTotalInterest(
            principal,
            fixedRate,
            variableRate,
            fixedTerm,
            termInYears - fixedTerm,
            extraPayment,
          ),
        )}
      />

      {totalInsurancePerMonth > 0 && (
        <Card
          label='Total en seguros'
          value={roundAndFormat(
            calculateTotalInsurancePayments(
              termInYears,
              lifeInsurance,
              fireInsurance,
              jobLossInsurance,
            ),
          )}
        />
      )}
      <Card
        label='Total a pagar'
        value={roundAndFormat(
          calculateTotalPayment(
            principal,
            fixedRate,
            variableRate,
            fixedTerm,
            termInYears - fixedTerm,
            extraPayment,
          ) +
            calculateTotalInsurancePayments(
              termInYears,
              lifeInsurance,
              fireInsurance,
              jobLossInsurance,
            ),
        )}
      />
    </div>
  );
};

export default LoanInfo;
