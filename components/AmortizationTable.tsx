import { roundAndFormat } from '@/lib/math.utils';
import { AmortizationRow } from '@/types/loan';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';
import * as React from 'react';

type IAmortizationTableProps = {
  data: AmortizationRow[];
};

const AmortizationTable: React.FunctionComponent<IAmortizationTableProps> = ({
  data,
}) => {
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Title>Tabla de amortización</Title>

      <Table className='mt-10'>
        <TableHead>
          <TableRow>
            {table.getHeaderGroups().map(headerGroup => {
              return headerGroup.headers.map(header => (
                <TableHeaderCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHeaderCell>
              ));
            })}
          </TableRow>
        </TableHead>
        <TableBody className='divide-y'>
          {table.getRowModel().rows.map(row => (
            <TableRow
              className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 '
              key={row.id}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AmortizationTable;
