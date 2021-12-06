import './App.css';
import React from 'react';
import { TransactionsTable } from './components/features/TransactionsTable';
import { getData, TData } from './api/getData';
import Button from '@mui/material/Button'
const account = '8YmMhex5Vd5JPsyNhCwFPDx5vqeedpCuyFE2W7VtRXQT';

function App() {
	const [data, setData] = React.useState<TData[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	React.useEffect(() => {
		getData(account).then(result => {
			setData(result);
		});
	}, []);

	const onClickHandler = React.useCallback(() => {
		setIsLoading(true);
		getData(account).then(result => {
			setData([...data, ...result]);
			setIsLoading(false);
		})
	}, [data]);

	return (
		<div className="app">
			<div className="table">
				<TransactionsTable data={data}/>
			</div>
			{
				data.length ?
					<div className="button">
						<Button onClick={onClickHandler} variant="contained">{isLoading ? 'Loading...' : 'Load more'}</Button>
					</div> : <span className="loading">Loading...</span>
			}
		</div>
	);
}

export default App;
