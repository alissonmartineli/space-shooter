export default class Enemy {
  constructor(game) {
    this.id = Math.floor(Math.random() * 10000000000);
    this.x = Math.floor(Math.random() * 95);
    this.y = 0;
    this.width = 5;
    this.height = 5;
    this.speed = 80;
    this.game = game;

    const interval = setInterval(() => {
      this.move();
    }, this.speed);

    this.interval = interval;
  }

  move() {
    if (this.y <= 95) {
      this.y += 1;
      return;
    }

    this.game.gameOver();
  }

  destroy() {
    clearInterval(this.interval);
    delete this.game.enemies[this.id];
  }

  on(event) {
    const handle = event.type;

    if (this[handle]) {
      this[handle]();
    }
  }

  gameover() {
    clearInterval(this.interval);
  }
}
