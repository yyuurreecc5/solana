import { Box, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { Column } from 'react-table';
import { toPlainString } from '../../utils/number';
import { getData, TData } from '../../api/getData';
import { Table } from '../ui-kit/Table';

type TProps = {
  account: string;
};

export const TransactionsTable: React.FC<TProps> = ({ account }) => {
  const [data, setData] = React.useState<TData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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

  React.useEffect(() => {
    setData([]);
    getData(account).then((result) => {
      setData(result);
    });
  }, [account]);

  const onClickHandler = React.useCallback(() => {
    setIsLoading(true);
    getData(account).then((result) => {
      setData([...data, ...result]);
      setIsLoading(false);
    });
  }, [data, account]);

  return (
    <div>
      <div className="table">
        <Table data={data} columns={columns} />{' '}
      </div>
      {data.length ? (
        <div className="button">
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Button onClick={onClickHandler} variant="contained">
              Load more
            </Button>
          )}
        </div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};
