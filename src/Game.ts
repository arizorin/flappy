import { Player } from './Player';
import { Environment } from './Environment';
import { ImageController } from './ImageController';
import { SoundController } from './SoundController';
import { GameState } from './model';

class Game {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private player: Player;

  private environment: Environment;

  private image: ImageController;

  private sound: SoundController;

  private state: GameState;

  private spacePressed: boolean = false;

  constructor() {
    this.canvas = Game.createCanvas();
    this.ctx = this.canvas.getContext('2d');

    this.image = new ImageController();
    this.sound = new SoundController();

    this.inputHandlers();
    this.startGame();
  }

  private inputHandlers() {
    window.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 32) {
        this.spacePressed = true;
      }
    });

    window.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 32) {
        this.spacePressed = false;
      }
    });

    window.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 82 && this.state === GameState.END) {
        this.startGame();
      }
    });
  }

  private static createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    canvas.id = 'gameCanvas';
    document.body.appendChild(canvas);
    return canvas;
  }

  private createBackground() {
    this.ctx.drawImage(this.image.background, 0, 0, this.canvas.width, this.canvas.height);
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createBackground();
    this.environment.update(this.player);

    this.player.draw();
    this.player.update(this.canvas.height, this.spacePressed);

    if (this.environment.checkCollision(this.player)) {
      this.endGame();
      return;
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  private startGame() {
    this.state = GameState.START;
    this.environment = new Environment(this.ctx, this.canvas.height, this.canvas.width, this.image, this.sound);
    this.player = new Player(this.ctx, this.image, this.sound);

    this.render();
  }

  private endGame() {
    this.state = GameState.END;

    this.ctx.font = '25px Georgia';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('PRESS R TO RESTART', this.canvas.width / 2, this.canvas.height / 2);

    this.player.saveHighestScore();
  }
}

const game = new Game();
