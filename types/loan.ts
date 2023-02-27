import z from 'zod';

export const LoanSchema = z
  .object({
    principal: z.coerce
      .number({
        required_error: 'Requerido',
      })
      .min(1),
    termInYears: z.coerce
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
    extraPayment: z.coerce.number().min(0).optional(),
    lifeInsurance: z.coerce.number().min(0).optional(),
    fireInsurance: z.coerce.number().min(0).optional(),
    jobLossInsurance: z.coerce.number().min(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.fixedTerm && data.fixedTerm > data.termInYears) {
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
