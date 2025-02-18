export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function shuffleArrayInplace(arr: any[]) {
  for (var i = arr.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
}

export function shuffleArray(arr: any[]) {
  arr = [...arr];
  shuffleArrayInplace(arr);
  return arr;
}
