import CostCards from '@/components/CostCards';
import useFetchData from '@/hooks/useFetchData';
import type { Loan, LoanCalculations } from '@/types/loan';
import { LoanSchema } from '@/types/loan';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
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
          termInYears: 20,
          annualInterestRate: 5.1,
          extraPayment: 0,
        },
      ],
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
  const { data, isLoading } = useFetchData<LoanCalculations>({
    queryKey: ['calculate-loan', loan],
    url: '/api/calculate-loan',
    params: { ...loan },
    reactQueryOptions: {
      enabled: !!loan,
    },
  });

  function addPeriodToLoan() {
    append({
      termInYears: 0,
      annualInterestRate: 0,
      extraPayment: 0,
    });
  }

  function removePeriodToLoan(index: number) {
    remove(index);
  }

  const onSubmit: SubmitHandler<Loan> = data => setLoan(data);

  return (
    <>
      <h1 className='text-4xl font-bold text-center mb-16'>
        Calculadora de crédito
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
              <div>
                <div className='mb-2 block'>
                  <Label
                    htmlFor={`periods[${index}].extraPayment`}
                    value='Pago mensual extraordinario (opcional)'
                  />
                </div>
                <TextInput
                  id={`periods[${index}].extraPayment`}
                  addon='$'
                  type='number'
                  {...register(`periods.${index}.extraPayment` as const)}
                  color={
                    errors.periods?.[index]?.extraPayment
                      ? 'failure'
                      : undefined
                  }
                  helperText={errors.periods?.[index]?.extraPayment?.message}
                  aria-invalid={
                    errors.periods?.[index]?.extraPayment ? 'true' : 'false'
                  }
                  aria-describedby='extraPayment'
                  min='0'
                />
              </div>
              {periods.length > 1 && (
                <Button
                  size='xs'
                  onClick={() => removePeriodToLoan(index)}
                  color='failure'
                >
                  X
                </Button>
              )}
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
        </div>
        <div className='flex gap-4'>
          <Button onClick={addPeriodToLoan} color='gray'>
            Agregar periodo
          </Button>
          <Button type='submit'>
            {isLoading && (
              <div className='mr-3'>
                <Spinner size='sm' light={true} />
              </div>
            )}
            Calcular
          </Button>
        </div>
      </form>
      {data && <CostCards data={data} />}
    </>
  );
};

export default Home;
