import {Obstacle} from "./Obstacle";
import {Player} from "./Player";
import {ImageController} from "./ImageController";
import {SoundController} from "./SoundController";

export class Environment {
    private obstacles: Obstacle[] = [];
    private maxObstacles: number = 20;
    private width: number = 25;
    private speed: number = 1;
    private lastX: number;

    private ctx: CanvasRenderingContext2D;
    private image: ImageController;
    private sound: SoundController;

    private canvasHeight: number;
    private canvasWidth: number;
    private spaceBetween: number;

    constructor(ctx: CanvasRenderingContext2D, canvasHeight: number, canvasWidth: number, image: ImageController, sound: SoundController) {
        this.ctx = ctx;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.image = image;
        this.sound = sound;

        this.lastX = this.canvasWidth / 2
        this.spaceBetween = this.width * 10;
    }

    public draw(index: number) {
        this.ctx.drawImage(this.image.pipe, this.obstacles[index].x, this.obstacles[index].y, this.obstacles[index].width, this.obstacles[index].height)
    }

    public update(player: Player) {
        const {x} = player.getInfo()

        if (this.obstacles.length < this.maxObstacles * 2) {
            this.createObstacle()
        }

        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= this.speed

            if (this.obstacles[i].x <= x && !this.obstacles[i].counted) {
                player.incrementScore();
                this.obstacles[i].counted = true;
            }

            if (this.obstacles[i].x < -this.width) {
                this.destroyOldObstacleByIndex(i)
            }
            this.draw(i);
        }
    }

    public checkCollision(player: Player): boolean {
        const {x, y, width, height} = player.getInfo()
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i]
            if ((x + width >= obstacle.x && x + width <= obstacle.x + obstacle.width)
                && (y + height >= obstacle.y && y + height <= obstacle.y + obstacle.height )
                || (y + height >= this.canvasHeight)
                || (y - height <= 0)) {
                this.sound.hit.play()
                this.ctx.drawImage(this.image.bang, x, y, 100, 100)
                return true;
            }
        }
        return false;
    }

    private createObstacle() {
        for (let i = 0; i < this.maxObstacles; i++) {
            const randomHeight = Math.floor(Math.random() * this.canvasHeight / 2)
            this.obstacles.push(new Obstacle(randomHeight, this.width,  this.lastX, 0))
            this.obstacles.push(new Obstacle(this.canvasHeight - randomHeight, this.width,  this.lastX, randomHeight + this.spaceBetween))
            this.lastX = this.lastX + this.spaceBetween
        }
    }

    private destroyOldObstacleByIndex(index: number) {
        this.obstacles.splice(index, 1)
    }

}
