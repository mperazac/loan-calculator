import { AmortizationRow, Loan } from '@/types/loan';
import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from 'flowbite-react';
import {
  calculateLoanTermInMonths,
  calculateMonthlyInterestRate,
  calculateMonthlyPayment,
  generateAmortizationSchedule,
  roundAndFormat,
} from '@/lib/math.utils';

type IAmortizationTableProps = Loan;

const AmortizationTable: React.FunctionComponent<
  IAmortizationTableProps
> = props => {
  const { principal, fixedRate = 0, loanTermInYears } = props;
  const columnHelper = createColumnHelper<AmortizationRow>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('month', {
        header: 'Mes',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('startingBalance', {
        header: 'Saldo inicial',
        cell: info => roundAndFormat(info.getValue()),
      }),
      columnHelper.accessor('payment', {
        header: 'Pago',
        cell: info => roundAndFormat(info.getValue()),
      }),
      columnHelper.accessor('interest', {
        header: 'Intereses',
        cell: info => roundAndFormat(info.getValue()),
      }),
      columnHelper.accessor('principal', {
        header: 'Principal',
        cell: info => roundAndFormat(info.getValue()),
      }),
      columnHelper.accessor('endingBalance', {
        header: 'Saldo final',
        cell: info => roundAndFormat(info.getValue()),
      }),
      columnHelper.accessor('totalInterest', {
        header: 'Total de intereses',
        cell: info => roundAndFormat(info.getValue()),
      }),
    ],
    [columnHelper],
  );

  const data = React.useMemo(() => {
    return generateAmortizationSchedule(principal, fixedRate, loanTermInYears);
  }, [fixedRate, loanTermInYears, principal]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table hoverable={true} className='mt-10'>
      <Table.Head>
        {table.getHeaderGroups().map(headerGroup => {
          return headerGroup.headers.map(header => (
            <Table.HeadCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </Table.HeadCell>
          ));
        })}
      </Table.Head>
      <Table.Body className='divide-y'>
        {table.getRowModel().rows.map(row => (
          <Table.Row
            className='bg-white dark:border-gray-700 dark:bg-gray-800'
            key={row.id}
          >
            {row.getVisibleCells().map(cell => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AmortizationTable;
