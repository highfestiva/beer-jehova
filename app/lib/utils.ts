import { PRNG } from './prng';

export function shuffleArrayInplace(arr: any[]) {
  const rng = new PRNG(101);
  for (var i = arr.length - 1; i >= 0; i--) {
      var j = rng.nextRange(0, i);
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
