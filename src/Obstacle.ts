export class Obstacle {
    counted: boolean;
    color: string;
    height: number;
    width: number;
    x: number;
    y: number;

    constructor(height: number, width: number, x: number = 0, y: number = 0, color: string = 'green', counter: boolean = false) {
        this.counted = false;
        this.color = color
        this.height = height
        this.width = width
        this.x = x
        this.y = y
    }
}
