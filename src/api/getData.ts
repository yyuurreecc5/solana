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
export const getData = async (account: string): Promise<TData[]> => {
  const signatures = await getSignatures(account, lastSignature);
  lastSignature = getLast(signatures, '');
  const promises = signatures.map((signature) => {
    return getTransactionInfo(signature);
  });

  return Promise.all(promises).then((results) => {
    return results.map((result, index) => {
      const preBalance = getFirst(result.meta.preBalances, 0);
      const postBalance = getLast(result.meta.postBalances, 0);

      return {
        signature: signatures[index],
        date: new Date(result.blockTime * 1000).toLocaleString(),
        status: isSuccess(result.meta.logMessages),
        postBalance: postBalance / 100000000,
        preBalance: preBalance / 100000000,
        balanceChange: (preBalance - postBalance) / 100000000,
      };
    });
  });
};

const isSuccess = (logMessages: string[]): boolean => {
  return getLast(logMessages, '').toLowerCase().includes('success');
};
