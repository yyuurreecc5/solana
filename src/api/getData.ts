import { getFirst, getLast } from '../utils/array';
import { getTransactionInfo } from './transactions';
import { getSignatures } from './signatures';

export type TData = {
  signature: string;
  date: string;
  status: boolean;
  postBalance: number;
  preBalance: number;
  balanceChange: number;
};

let lastSignature = '';
let lastAccount = '';
export const getData = async (account: string): Promise<TData[]> => {
  console.log({ lastAccount, account });
  if (lastAccount && lastAccount !== account) {
    console.log('if');
    lastSignature = '';
  }

  const signatures = await getSignatures(account, lastSignature);
  lastSignature = getLast(signatures, '');
  lastAccount = account;
  const promises = signatures.map((signature) => {
    return getTransactionInfo(signature);
  });

  return Promise.all(promises).then((results) => {
    return results.map((result, index) => {
      const preBalance = getLast(result.meta.preBalances, 0);
      const postBalance = getFirst(result.meta.postBalances, 0);
      const changeBalance = postBalance - preBalance;
      return {
        signature: signatures[index],
        date: new Date(result.blockTime * 1000).toLocaleString(),
        status: isSuccess(result.meta.logMessages),
        postBalance: postBalance !== 0 ? postBalance / 1000000000 : 0,
        preBalance: preBalance !== 0 ? preBalance / 1000000000 : 0,
        balanceChange: changeBalance !== 0 ? changeBalance / 1000000000 : 0,
      };
    });
  });
};

const isSuccess = (logMessages: string[]): boolean => {
  return getLast(logMessages, '').toLowerCase().includes('success');
};
