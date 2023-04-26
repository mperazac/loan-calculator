import { Loan } from '@/types/loan';
import { generateAmortizationSchedule } from './math.utils';

type PaymentDetailChartData = {
	year: number;
	principal: number;
	interest: number;
	balance: number;
};

// Generates per year chart data of the loan
export function getPaymentDetailChartData(
	loan: Loan,
): PaymentDetailChartData[] {
	const amortizationSchedule = generateAmortizationSchedule(loan);
	const data: PaymentDetailChartData[] = [];
	let year = 0;
	amortizationSchedule.forEach(row => {
		if (row.month % 12 === 0) {
			year += 1;
			data.push({
				year,
				principal: row.principal,
				balance: row.startingBalance,
				interest: row.interest,
			});
		}
	});
	return data;
}

type AmortizationChartData = {
	year: number;
	Interes: number;
	'Saldo Capital': number;
	Cuota: number;
};
export function getAmortizationChartData(loan: Loan): AmortizationChartData[] {
	const amortizationSchedule = generateAmortizationSchedule(loan);
	const data: AmortizationChartData[] = [];
	let year = 0;
	amortizationSchedule.forEach(row => {
		if (row.month % 12 === 0) {
			year += 1;
			data.push({
				year,
				'Saldo Capital': row.endingBalance,
				Interes: row.totalInterest,
				Cuota: row.payment,
			});
		}
	});
	return data;
}
