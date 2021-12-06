import { request } from './core';

type TSignaturesResponse = {
	signature: string;
}[]

export const getSignatures = async (account: string, before: string): Promise<string[]> => {
	const params = [account, {limit: 10, before: before ? before : undefined}];
	const result = await request<TSignaturesResponse>('getSignaturesForAddress', params);
	return result.map(s => s.signature);
}
