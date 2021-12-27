export class ImageController {
  public player: HTMLImageElement;

  public bang: HTMLImageElement;

  public background: HTMLImageElement;

  public pipeTop: HTMLImageElement;
  public pipeBottom: HTMLImageElement;

  constructor() {
    this.bang = new Image();
    this.bang.src = 'sprites/bang.png';

    this.player = new Image();
    this.player.src = 'sprites/bird.png';

    this.background = new Image();
    this.background.src = 'sprites/background.jpg';

    this.pipeTop = new Image();
    this.pipeTop.src = 'sprites/pipeTop.png';

    this.pipeBottom = new Image();
    this.pipeBottom.src = 'sprites/pipeBottom.png';
  }
}
