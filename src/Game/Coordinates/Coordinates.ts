import { Direction } from '../types';

export type xType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type yType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type xyType = `${xType}${yType}`;
export type xyTypeAsArray = [xType, yType];

export class Coordinates {
  public static xArr: xType[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  public static yArr: yType[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  public static xyArray: xyType[] = this.createXYArray();

  // Overloads
  static getNextCoordinate(coord: xType, direction: Direction): xType | null;
  static getNextCoordinate(coord: yType, direction: Direction): yType | null;
  static getNextCoordinate(
    coord: xType | yType,
    direction: Direction
  ): xType | yType | null {
    const index =
      this.xArr.indexOf(coord as xType) === -1
        ? this.yArr.indexOf(coord as yType)
        : this.xArr.indexOf(coord as xType);

    if (index === -1) return null;

    const newIndex = index + direction;
    const arr: xType[] | yType[] =
      this.xArr.indexOf(coord as xType) === -1 ? this.yArr : this.xArr;

    return arr[newIndex] || null;
  }

  public static isAvailableXY(xy: xyType): boolean {
    return this.indexOf(xy) === -1 ? false : true;
  }

  public static xyStringToArr(xy: xyType): xyTypeAsArray {
    return [xy[0], xy[1]] as xyTypeAsArray;
  }

  public static xyToArr(x: xType, y: yType): xyTypeAsArray {
    return [x, y];
  }

  public static arrToString([x, y]: xyTypeAsArray): xyType {
    return `${x}${y}`;
  }

  public static getX(xy: xyType | xyTypeAsArray): xType {
    return xy[0] as xType;
  }

  public static getY(xy: xyType | xyTypeAsArray): yType {
    return xy[1] as yType;
  }

  public static indexOf(xy: xyType | xyTypeAsArray): number {
    return typeof xy === 'string'
      ? this.xyArray.indexOf(xy)
      : this.xyArray.indexOf(`${xy[0]}${xy[1]}`);
  }

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
