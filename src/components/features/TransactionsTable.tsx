import React from 'react';
import { Column } from 'react-table';
import { toPlainString } from '../../utils/number';
import { TData } from '../../api/getData';
import { Table } from '../ui-kit/Table';

type TProps = {
  data: TData[];
};

export const TransactionsTable: React.FC<TProps> = ({ data }) => {
  const columns: Column<TData>[] = React.useMemo(
    () => [
      {
        Header: 'Transaction History',
        columns: [
          {
            Header: 'Signature',
            accessor: 'signature',
          },
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: 'Status',
            accessor: ({ status }) =>
              status ? (
                <span style={{ color: 'green' }}>Success</span>
              ) : (
                <span style={{ color: 'red' }}>Failed</span>
              ),
          },
          {
            Header: 'Pre balance',
            accessor: ({ preBalance }) => toPlainString(preBalance),
          },
          {
            Header: 'Post balance',
            accessor: ({ postBalance }) => toPlainString(postBalance),
          },
          {
            Header: 'Balance change',
            accessor: ({ balanceChange }) =>
              !balanceChange ? (
                balanceChange
              ) : (
                <span style={{ color: balanceChange >= 0 ? 'green' : 'red' }}>
                  {toPlainString(balanceChange)}
                </span>
              ),
          },
        ],
      },
    ],
    []
  );

  return <Table data={data} columns={columns} />;
};
