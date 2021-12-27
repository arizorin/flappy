export class ImageController {
    public player: HTMLImageElement;
    public bang: HTMLImageElement;
    public background: HTMLImageElement;
    public pipe: HTMLImageElement;

    constructor() {
        this.bang = new Image();
        this.bang.src = 'sprites/bang.png'

        this.player = new Image();
        this.player.src = 'sprites/bird.png';

        this.background = new Image();
        this.background.src = 'sprites/background.jpg';


        this.pipe = new Image();
        this.pipe.src = 'sprites/pipe.png';
    }
}
