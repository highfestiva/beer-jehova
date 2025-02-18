export class PRNG {

  private m: number;
  private a: number;
  private c: number;
  private state: number;

  public constructor(seed: number) {
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;
    this.state = seed;
  }

  public nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  public nextFloat() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  }

  public nextRange(start: number, end: number) {
    // returns in range [start, end): including start, excluding end
    // can't modulu nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }

  public choice(arr: any[]) {
    return arr[this.nextRange(0, arr.length)];
  }
}
