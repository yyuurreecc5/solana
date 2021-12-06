import { request } from './core';

export type TTransactionInfo = {
  blockTime: number;
  meta: {
    logMessages: string[];
    postBalances: number[];
    preBalances: number[];
  };
};

export const getTransactionInfo = (
  transaction: string
): Promise<TTransactionInfo> => {
  return request<TTransactionInfo>('getTransaction', [transaction]);
};
