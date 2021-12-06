const API_URLS = [
  'http://api.mainnet-beta.solana.com/',
  'https://free.rpcpool.com/',
  'https://rpcpool.com/pricing/',
];

let currentApiIndex = 0;
export const request = async <T>(
  method: string,
  params: object
): Promise<T> => {
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };

  try {
    const response = await fetch(API_URLS[currentApiIndex], {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Network error');
    const json = await response.json();
    return json.result;
  } catch (e) {
    currentApiIndex =
      currentApiIndex === API_URLS.length - 1 ? 0 : currentApiIndex + 1;
    return request(method, params);
  }
};
