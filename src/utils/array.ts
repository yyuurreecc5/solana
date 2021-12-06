export const getLast = <T, Default>(
  arr: T[],
  defaultValue: Default
): T | Default => {
  const lastIndex = arr.length - 1;
  return lastIndex >= 0 ? arr[lastIndex] : defaultValue;
};

export const getFirst = <T, Default>(
  arr: T[],
  defaultValue: Default
): T | Default => {
  return arr.length > 0 ? arr[0] : defaultValue;
};
