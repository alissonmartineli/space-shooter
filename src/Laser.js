export default class Laser {
  constructor(x, y, game) {
    this.id = Math.floor(Math.random() * 10000000000);
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 2;
    this.speed = 10;
    this.game = game;

    const interval = setInterval(() => {
      this.move();
    }, this.speed);

    this.interval = interval;
  }

  move() {
    if (this.y - 1 >= 0) {
      this.y -= 1;
      return;
    }

    this.destroy();
  }

  destroy() {
    clearInterval(this.interval);
    delete this.game.shoots[this.id];
  }
}
