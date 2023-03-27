import { getPaymentDetailChartData } from '@/lib/chart.utils';
import { LoanSchema } from '@/types/loan';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnType<typeof getPaymentDetailChartData>>,
) {
  let queryLoan = req.query;
  let loanParse = qs.parse(queryLoan as Record<string, string>);
  let loan = LoanSchema.parse(loanParse);
  const results = getPaymentDetailChartData(loan);
  console.log(results);
  res.status(200).json(results);
}
