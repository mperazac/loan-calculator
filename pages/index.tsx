import type { NextPage } from 'next';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button, Label, TextInput } from 'flowbite-react';

const LoanSchema = z
  .object({
    amount: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(1),
    term: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(1, 'Plazo debe ser mayor que 0'),
    fixedTerm: z.coerce.number().min(0).optional(),
    fixedRate: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(0)
      .optional(),
    variableRate: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(1),
    extraPayment: z.coerce.number({
      required_error: 'Requerido',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.fixedTerm && data.fixedTerm > data.term) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: data.fixedTerm,
        type: 'number',
        inclusive: true,
        path: ['fixedTerm'],
        message:
          'Plazo de tasa fija no puede ser mayor que el plazo total del crédito',
      });
    }
  });

type Loan = z.infer<typeof LoanSchema>;

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Loan>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      amount: 100000,
      term: 20,
      fixedTerm: 2,
      fixedRate: 8.25,
      variableRate: 10.25,
      extraPayment: 0,
    },
  });
  const onSubmit: SubmitHandler<Loan> = data => console.log(data);
  function getVariableTerm() {
    return watch('term') - (watch('fixedTerm') || 0);
  }

  return (
    <>
      <h1 className='text-6xl font-bold'>Loan Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6 mb-6 md:grid-cols-3'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='amount' value='Monto total del crédito' />
            </div>
            <TextInput
              id='amount'
              addon='$'
              type='number'
              {...register('amount')}
              color={errors.amount ? 'failure' : undefined}
              helperText={errors.amount?.message}
              aria-invalid={errors.amount ? 'true' : 'false'}
              aria-describedby='amount'
              min='0'
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='term' value='Plazo total del crédito' />
            </div>
            <TextInput
              id='term'
              addon='Años'
              type='number'
              {...register('term')}
              color={errors.term ? 'failure' : undefined}
              helperText={errors.term?.message}
              aria-invalid={errors.term ? 'true' : 'false'}
              aria-describedby='term'
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
        <Button>Calcular</Button>
      </form>
    </>
  );
};

export default Home;
