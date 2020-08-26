export const generateRandomArray = (
  amount: number,
  min: number,
  max: number
): number[] => {
  const result: number[] = [];
  while (result.length < amount) {
    const number = Math.floor(Math.random() * (max - min) + min);
    if (result.indexOf(number) === -1) {
      result.push(number);
    }
  }
  return result;
};

export const randomArrayMixUp = <T> (array: T[]): T[] => {
  const permtutation = generateRandomArray(array.length, 0, array.length);
  return permtutation.map(index => array[index]);
};
