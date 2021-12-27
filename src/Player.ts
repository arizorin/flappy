import {ImageController} from "./ImageController";
import {SoundController} from "./SoundController";

export class Player {
    private ctx: CanvasRenderingContext2D;
    private image: ImageController;
    private sound: SoundController;

    private x: number = 100;
    private y: number = 200;
    private velocity: number = 0;
    private weight: number = 0.5;

    private height: number = 25;
    private width: number = 25;
    private color: string = 'green';

    private score: number = 0;
    private highestScore: number = 0;

    constructor(ctx: CanvasRenderingContext2D, image: ImageController, sound: SoundController) {
        this.ctx = ctx;
        this.image = image;
        this.sound = sound;

        this.highestScore = this.getHighestScore()
    }

    public getInfo(): {x: number, y: number, width: number, height: number} {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }

    public draw() {
        this.drawScore();
        this.ctx.fillStyle = this.color
        this.ctx.drawImage(this.image.player, this.x, this.y, this.width * 2, this.height * 2)
    }

    public update(maxHeight: number, spacePressed: boolean) {
        if (this.y > maxHeight - this.height) {
            this.y = maxHeight - this.height
            this.velocity = 0
        } else {
            this.velocity += this.weight;
            this.velocity *= 0.9
            this.y += this.velocity
        }

        if (this.y < this.height) {
            this.y = this.height
            this.velocity = 0
        }

        if (spacePressed) {
            this.velocity -= 2
            this.sound.fly.play();
        }
    }

    public incrementScore() {
        this.sound.score.play()
        this.score+= 0.5

        if (this.score > this.highestScore) {
            this.highestScore = this.score
        }
    }

    public getScore(): number {
        return this.score
    }

    public saveHighestScore() {
        if (this.score > this.highestScore) {
            window.localStorage.setItem('HIGHEST', this.score.toString())
        }
    }

    private getHighestScore():number {
        const value = window.localStorage.getItem('HIGHEST')
        return value ? Number(value) : 0
    }

    private drawScore() {
        this.ctx.font = "25px Georgia"
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Score: ${this.score}`, 50, 50)
        this.ctx.fillText(`Highest score: ${this.highestScore}`, 50, 80)
    }
}
