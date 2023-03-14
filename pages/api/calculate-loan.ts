import { calculateLoan } from '@/lib/math.utils';
import { LoanCalculations, LoanSchema } from '@/types/loan';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoanCalculations>,
) {
  let queryLoan = req.query;
  let loanParse = qs.parse(queryLoan as Record<string, string>);
  let loan = LoanSchema.parse(loanParse);
  const results = calculateLoan(loan);
  res.status(200).json(results);
}
