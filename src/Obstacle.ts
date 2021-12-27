import { PipeType } from './model';

export class Obstacle {
  counted: boolean;

  color: string;

  height: number;

  width: number;

  x: number;

  y: number;

  type: PipeType;

  constructor(
    height: number,
    width: number,
    x: number = 0,
    y: number = 0,
    type: PipeType,
    color: string = 'green',
    counter: boolean = false,
  ) {
    this.counted = false;
    this.color = color;
    this.type = type;

    this.height = height;
    this.width = width;

    this.x = x;
    this.y = y;
  }
}
