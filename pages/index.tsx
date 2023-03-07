import AmortizationTable from '@/components/AmortizationTable';
import Card from '@/components/common/Card';
import LoanInfo from '@/components/LoanInfo';
import { Loan, LoanSchema } from '@/types/loan';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, TextInput } from 'flowbite-react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Loan>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      principal: 153000,
      totalTermInYears: 20,
      periods: [
        {
          termInYears: 1,
          annualInterestRate: 5.1,
        },
        {
          termInYears: 2,
          annualInterestRate: 6.6,
        },
        {
          termInYears: 27,
          annualInterestRate: 8.3,
        },
      ],
      extraPayment: 0,
      lifeInsurance: 54,
      fireInsurance: 22,
      jobLossInsurance: 0,
    },
    mode: 'onChange',
  });
  const [loan, setLoan] = useState<Loan>();
  const {
    fields: periods,
    append,
    remove,
  } = useFieldArray({
    name: 'periods',
    control,
  });
  const onSubmit: SubmitHandler<Loan> = data => setLoan(data);
  return (
    <>
      <h1 className='text-4xl font-bold text-center mb-16'>
        Cálculadora de crédito
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6 mb-6 md:grid-cols-6'>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='termInYears' value='Plazo total del crédito' />
              </div>
              <TextInput
                id='termInYears'
                addon='Años'
                type='number'
                {...register('totalTermInYears')}
                color={errors.totalTermInYears ? 'failure' : undefined}
                helperText={errors.totalTermInYears?.message}
                aria-invalid={errors.totalTermInYears ? 'true' : 'false'}
                aria-describedby='termInYears'
                min='0'
              />
            </div>
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
          </div>
          {periods.map((field, index) => (
            <div className='space-y-6' key={field.id}>
              <div>
                <div className='mb-2 block'>
                  <Label
                    htmlFor={`periods[${index}].termInYears`}
                    value={`Plazo del periodo ${index + 1}`}
                  />
                </div>
                <TextInput
                  id={`periods[${index}].termInYears`}
                  addon='Años'
                  type='number'
                  {...register(`periods.${index}.termInYears` as const)}
                  color={
                    errors.periods?.[index]?.termInYears ? 'failure' : undefined
                  }
                  helperText={errors.periods?.[index]?.termInYears?.message}
                  aria-invalid={
                    errors.periods?.[index]?.termInYears ? 'true' : 'false'
                  }
                  aria-describedby={`periods[${index}].termInYears`}
                  min='0'
                />
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label
                    htmlFor={`periods[${index}].annualInterestRate`}
                    value={`Tasa de interés del periodo ${index + 1}`}
                  />
                </div>
                <TextInput
                  id={`periods[${index}].annualInterestRate`}
                  addon='%'
                  type='number'
                  {...register(`periods.${index}.annualInterestRate` as const)}
                  color={
                    errors.periods?.[index]?.annualInterestRate
                      ? 'failure'
                      : undefined
                  }
                  helperText={
                    errors.periods?.[index]?.annualInterestRate?.message
                  }
                  aria-invalid={
                    errors.periods?.[index]?.annualInterestRate
                      ? 'true'
                      : 'false'
                  }
                  aria-describedby={`periods[${index}].annualInterestRate`}
                  min='0'
                  step='0.01'
                />
              </div>
            </div>
          ))}

          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='lifeInsurance'
                  value='Seguro saldo deudor (opcional)'
                />
              </div>
              <TextInput
                id='lifeInsurance'
                addon='$'
                type='number'
                {...register('lifeInsurance')}
                color={errors.lifeInsurance ? 'failure' : undefined}
                helperText={errors.lifeInsurance?.message}
                aria-invalid={errors.lifeInsurance ? 'true' : 'false'}
                aria-describedby='lifeInsurance'
                min='0'
                step='0.01'
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='fireInsurance'
                  value='Seguro patrimonial (opcional)'
                />
              </div>
              <TextInput
                id='fireInsurance'
                addon='$'
                type='number'
                {...register('fireInsurance')}
                color={errors.fireInsurance ? 'failure' : undefined}
                helperText={errors.fireInsurance?.message}
                aria-invalid={errors.fireInsurance ? 'true' : 'false'}
                aria-describedby='fireInsurance'
                min='0'
                step='0.01'
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='jobLossInsurance'
                  value='Seguro de desempleo (opcional)'
                />
              </div>
              <TextInput
                id='jobLossInsurance'
                addon='$'
                type='number'
                {...register('jobLossInsurance')}
                color={errors.jobLossInsurance ? 'failure' : undefined}
                helperText={errors.jobLossInsurance?.message}
                aria-invalid={errors.jobLossInsurance ? 'true' : 'false'}
                aria-describedby='jobLossInsurance'
                min='0'
                step='0.01'
              />
            </div>
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
      {loan && (
        <>
          <LoanInfo loan={loan}></LoanInfo>
          <AmortizationTable loan={loan} />
        </>
      )}
    </>
  );
};

export default Home;
