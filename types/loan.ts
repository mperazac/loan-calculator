import { calculateLoan } from '@/lib/math.utils';
import type { DeltaType, Size } from '@tremor/react';
import z from 'zod';

export const LoanSchema = z
  .object({
    principal: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(1),
    totalTermInYears: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(1, 'Plazo debe ser mayor que 0'),
    periods: z.array(
      z.object({
        termInYears: z.coerce
          .number({
            required_error: 'Requerido',
          })
          .min(1, 'Plazo debe ser mayor que 0'),
        annualInterestRate: z.coerce
          .number({
            required_error: 'Requerido',
          })
          .min(0),
        extraPayment: z.coerce.number().min(0).optional(),
      }),
    ),
    lifeInsurance: z.coerce.number().min(0).optional(),
    fireInsurance: z.coerce.number().min(0).optional(),
    jobLossInsurance: z.coerce.number().min(0).optional(),
  })
  .superRefine((data, ctx) => {
    let totalTerm = 0;
    data.periods.forEach((period, index) => {
      totalTerm += period.termInYears;
      if (totalTerm > data.totalTermInYears) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: data.totalTermInYears,
          type: 'number',
          inclusive: true,
          path: ['periods', index, 'termInYears'],
          message: 'Plazo no puede ser mayor que el plazo total del crédito',
        });
      }
    });
    if (totalTerm < data.totalTermInYears) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: data.totalTermInYears,
        type: 'number',
        inclusive: true,
        path: ['periods', data.periods.length - 1, 'termInYears'],
        message: 'Plazo no puede ser menor que el plazo total del crédito',
      });
    }
  });

export type Loan = z.infer<typeof LoanSchema>;

export type AmortizationRow = {
  month: number;
  startingBalance: number;
  payment: number;
  interest: number;
  principal: number;
  endingBalance: number;
  totalInterest: number;
};

export type LoanCalculations = ReturnType<typeof calculateLoan>;

export type BadgeProps =
  | {
      deltaType: DeltaType;
      isIncreasePositive: boolean;
      size: Size;
      value: string;
    }
  | undefined;
