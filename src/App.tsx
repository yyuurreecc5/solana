import './App.css';
import React, { SyntheticEvent } from 'react';
import { FormControl, TextField } from '@mui/material';
import { TransactionsTable } from './components/features/TransactionsTable';
const DEFAULT_ACCOUNT = '8YmMhex5Vd5JPsyNhCwFPDx5vqeedpCuyFE2W7VtRXQT';

function App() {
  const [account, setAccount] = React.useState<string>(DEFAULT_ACCOUNT);

  const onSearchHandler = React.useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setAccount((e.target as HTMLFormElement).accountSearch.value);
  }, []);

  return (
    <div className="app">
      <div className="search">
        <form onSubmit={onSearchHandler}>
          <FormControl fullWidth={true}>
            <TextField
              fullWidth
              id="outlined-search"
              label="Input account public key"
              type="search"
              margin="dense"
              defaultValue={account}
              name="accountSearch"
            />
          </FormControl>
        </form>
      </div>
      {account ? <TransactionsTable account={account} /> : null}
    </div>
  );
}

export default App;
