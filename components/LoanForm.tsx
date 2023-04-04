import { Loan, LoanSchema } from '@/types/loan';
import {
  ClockIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@tremor/react';
import { Label } from 'flowbite-react';
import * as React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

interface ILoanFormProps {
  onSubmit: (data: Loan) => void;
}

const LoanForm: React.FunctionComponent<ILoanFormProps> = props => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Loan>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      principal: 157500,
      totalTermInYears: 20,
      periods: [
        {
          termInYears: 1,
          annualInterestRate: 5.1,
          extraPayment: 0,
        },
        {
          termInYears: 2,
          annualInterestRate: 6.6,
          extraPayment: 0,
        },
        {
          termInYears: 17,
          annualInterestRate: 8.3,
          extraPayment: 0,
        },
      ],
      lifeInsurance: 0,
      fireInsurance: 0,
      jobLossInsurance: 0,
    },
    mode: 'onChange',
  });
  const {
    fields: periods,
    append,
    remove,
  } = useFieldArray({
    name: 'periods',
    control,
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

  const onSubmit: SubmitHandler<Loan> = data => props.onSubmit(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-4 md:p-10 bg-white border rounded-lg'
    >
      <div className='grid gap-6 mb-6 md:grid-cols-6'>
        <div className='space-y-6'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='termInYears' value='Plazo total del crédito' />
            </div>
            <TextInput
              aria-describedby='termInYears'
              aria-invalid={errors.totalTermInYears ? 'true' : 'false'}
              error={!!errors.totalTermInYears}
              errorMessage={errors.totalTermInYears?.message}
              icon={ClockIcon}
              id='termInYears'
              {...register('totalTermInYears')}
              placeholder='En años'
              // @ts-ignore
              type='number'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='principal' value='Monto total del crédito' />
            </div>
            <TextInput
              id='principal'
              icon={CurrencyDollarIcon}
              // @ts-ignore
              type='number'
              {...register('principal')}
              error={!!errors.principal}
              errorMessage={errors.principal?.message}
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
                icon={ClockIcon}
                placeholder='En años'
                // @ts-ignore
                type='number'
                {...register(`periods.${index}.termInYears` as const)}
                error={!!errors.periods?.[index]?.termInYears}
                errorMessage={errors.periods?.[index]?.termInYears?.message}
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
                icon={ReceiptPercentIcon}
                // @ts-ignore
                type='number'
                {...register(`periods.${index}.annualInterestRate` as const)}
                error={!!errors.periods?.[index]?.annualInterestRate}
                errorMessage={
                  errors.periods?.[index]?.annualInterestRate?.message
                }
                aria-invalid={
                  errors.periods?.[index]?.annualInterestRate ? 'true' : 'false'
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
                icon={CurrencyDollarIcon}
                // @ts-ignore
                type='number'
                {...register(`periods.${index}.extraPayment` as const)}
                error={!!errors.periods?.[index]?.extraPayment}
                errorMessage={errors.periods?.[index]?.extraPayment?.message}
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
                variant='secondary'
                color='gray'
              >
                <TrashIcon className='h-3 w-3' />
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
              icon={CurrencyDollarIcon}
              // @ts-ignore
              type='number'
              {...register('lifeInsurance')}
              error={!!errors.lifeInsurance}
              errorMessage={errors.lifeInsurance?.message}
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
              icon={CurrencyDollarIcon}
              // @ts-ignore
              type='number'
              {...register('fireInsurance')}
              error={!!errors.fireInsurance}
              errorMessage={errors.fireInsurance?.message}
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
              icon={CurrencyDollarIcon}
              // @ts-ignore
              type='number'
              {...register('jobLossInsurance')}
              error={!!errors.jobLossInsurance}
              errorMessage={errors.jobLossInsurance?.message}
              aria-invalid={errors.jobLossInsurance ? 'true' : 'false'}
              aria-describedby='jobLossInsurance'
              min='0'
              step='0.01'
            />
          </div>
        </div>
      </div>
      <div className='flex gap-4 justify-end'>
        <Button
          onClick={addPeriodToLoan}
          variant='secondary'
          disabled={watch('periods').length > 3}
        >
          Agregar periodo
        </Button>
        <Button type='submit'>Calcular</Button>
      </div>
    </form>
  );
};

export default LoanForm;
