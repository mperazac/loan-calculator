import LoanInfo from '@/components/common/LoanInfo';
import { Loan, LoanSchema } from '@/types/loan';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, TextInput } from 'flowbite-react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Loan>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      principal: 100000,
      loanTermInYears: 20,
      fixedTerm: 2,
      fixedRate: 8.25,
      variableRate: 10.25,
      extraPayment: 0,
    },
  });
  const [loan, setLoan] = useState<Loan>();
  const onSubmit: SubmitHandler<Loan> = data => setLoan(data);

  function getVariableTerm() {
    return watch('loanTermInYears') - (watch('fixedTerm') || 0);
  }

  return (
    <>
      <h1 className='text-6xl font-bold'>Loan Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6 mb-6 md:grid-cols-3'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='principal' value='Monto total del crédito' />
            </div>
            <TextInput
              id='principal'
              addon='$'
              type='number'
              {...register('principal')}
              color={errors.principal ? 'failure' : undefined}
              helperText={errors.principal?.message}
              aria-invalid={errors.principal ? 'true' : 'false'}
              aria-describedby='principal'
              min='0'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='loanTermInYears'
                value='Plazo total del crédito'
              />
            </div>
            <TextInput
              id='loanTermInYears'
              addon='Años'
              type='number'
              {...register('loanTermInYears')}
              color={errors.loanTermInYears ? 'failure' : undefined}
              helperText={errors.loanTermInYears?.message}
              aria-invalid={errors.loanTermInYears ? 'true' : 'false'}
              aria-describedby='loanTermInYears'
              min='0'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='fixedRate' value='Tasa fija' />
            </div>
            <TextInput
              id='fixedRate'
              addon='%'
              type='number'
              {...register('fixedRate')}
              color={errors.fixedRate ? 'failure' : undefined}
              helperText={errors.fixedRate?.message}
              aria-invalid={errors.fixedRate ? 'true' : 'false'}
              aria-describedby='fixedRate'
              min='0'
              step='0.01'
            />
          </div>

          <div>
            <div className='mb-2 block'>
              <Label htmlFor='fixedTerm' value='Plazo de la tasa fija' />
            </div>
            <TextInput
              id='fixedTerm'
              addon='Años'
              type='number'
              {...register('fixedTerm')}
              color={errors.fixedTerm ? 'failure' : undefined}
              helperText={errors.fixedTerm?.message}
              aria-invalid={errors.fixedTerm ? 'true' : 'false'}
              aria-describedby='fixedTerm'
              min='0'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='variableRate' value='Tasa variable' />
            </div>
            <TextInput
              id='variableRate'
              addon='%'
              type='number'
              {...register('variableRate')}
              color={errors.variableRate ? 'failure' : undefined}
              helperText={errors.variableRate?.message}
              aria-invalid={errors.variableRate ? 'true' : 'false'}
              aria-describedby='variableRate'
              min='0'
              step='0.01'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='variableTerm' value='Plazo de la tasa variable' />
            </div>
            <TextInput
              id='variableTerm'
              addon='Años'
              type='number'
              disabled={true}
              aria-describedby='variableTerm'
              min='0'
              value={getVariableTerm()}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='extraPayment'
                value='Pago mensual extraordinario (opcional)'
              />
            </div>
            <TextInput
              id='extraPayment'
              addon='$'
              type='number'
              {...register('extraPayment')}
              color={errors.extraPayment ? 'failure' : undefined}
              helperText={errors.extraPayment?.message}
              aria-invalid={errors.extraPayment ? 'true' : 'false'}
              aria-describedby='extraPayment'
              min='0'
            />
          </div>
        </div>
        <Button type='submit'>Calcular</Button>
      </form>
      {loan && <LoanInfo {...loan}></LoanInfo>}
    </>
  );
};

export default Home;
