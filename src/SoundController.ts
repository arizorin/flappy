export class SoundController {
  fly: HTMLAudioElement;

  hit: HTMLAudioElement;

  score: HTMLAudioElement;

  constructor() {
    this.fly = this.createSound('sounds/sfx_swooshing.wav');
    this.fly.playbackRate = 5;

    this.hit = this.createSound('sounds/sfx_hit.wav');
    this.score = this.createSound('sounds/sfx_point.wav');
  }

  private createSound(src: string): HTMLAudioElement {
    return new Audio(src);
  }
}
