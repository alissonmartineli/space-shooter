import Laser from './Laser.js';
import Enemy from './Enemy.js';

export default class Game {
  constructor(player) {
    this.shoots = {};
    this.enemies = {};
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyAll(event) {
    this.observers.forEach((observer) => observer(event));
  }

  addShoot(event) {
    const shoot = new Laser(event.x, event.y, this);
    this.shoots[shoot.id] = shoot;
  }

  addPlayer(player) {
    this.player = player;
  }

  createEnemy() {
    const enemy = new Enemy(this);
    this.subscribe((e) => enemy.on(e))
    this.enemies[enemy.id] = enemy;
  }

  checkCollision() {
    for (const enemyId in this.enemies) {
      for (const shootId in this.shoots) {
        const enemy = this.enemies[enemyId];
        const shoot = this.shoots[shootId];

        if (enemy.x < shoot.x + shoot.width &&
          enemy.x + enemy.width > shoot.x &&
          enemy.y < shoot.y + shoot.height &&
          enemy.y + enemy.height > shoot.y) {
          shoot.destroy();
          enemy.destroy();
        }
      }
    }
  }

  run() {
    this.shoots = {};
    this.enemies = {};
    this.player.x = 50;

    const interval = setInterval(() => {
      this.createEnemy();
    }, 1500);

    this.interval = interval;

    setInterval(() => {
      this.checkCollision();
    }, 10);
  }

  gameOver() {
    clearInterval(this.interval);
    const event = {type: 'gameover'};
    this.notifyAll(event);
  }
}
