export type xType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type yType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type xyType = `${xType}${yType}`;
export type xyTypeAsArray = [xType, yType];
export type xyObjectFieldsType = Record<xyType, string>;

export class Coordinates {
  public static xyArray: xyType[] = this.createXYArray();
  public static xArr: xType[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  public static yArr: yType[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  private static createXYArray(): xyType[] {
    const array: xyType[] = [];

    let y: number = 7;
    let x: number = 0;

    for (let i = 1; i <= 64; i++) {
      array.push(`${this.xArr[x]}${this.yArr[y]}`);

      if (i % 8 === 0) {
        y--;
        x = 0;
      } else {
        x++;
      }
    }

    return array;
  }
}
