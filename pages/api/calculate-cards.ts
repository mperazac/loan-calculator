import { calculateAllCosts } from '@/lib/math.utils';
import { LoanSchema } from '@/types/loan';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnType<typeof calculateAllCosts>>,
) {
  let queryLoan = req.query;
  let loanParse = qs.parse(queryLoan as Record<string, string>);
  let loan = LoanSchema.parse(loanParse);
  const allCosts = calculateAllCosts(loan);
  res.status(200).json(allCosts);
}
