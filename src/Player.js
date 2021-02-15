export default class Player {
  constructor() {
    this.id = Math.floor(Math.random() * 10000000000);
    this.x = 50;
    this.y = 90;
    this.width = 5;
    this.height = 5;
    this.observers = [];
    this.status = true;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyAll(event) {
    this.observers.forEach((observer) => {
      if (observer.type === event.type) {
        observer.handle(event)
      }
    });
  }

  move(event) {
    if (!this.status) {
      return;
    }

    const keyPressed = event.keyPressed;

    if (keyPressed === 'ArrowRight') {
      this.moveRight();
      return;
    }

    if (keyPressed === 'ArrowLeft') {
      this.moveLeft();
      return;
    }
  }

  shoot(event) {
    if (!this.status) {
      return;
    }

    const keyPressed = event.keyPressed;
    if (keyPressed === " ") {
      const event = {
        type: 'shoot',
        x: this.x + 2,
        y: this.y
      };
      this.notifyAll(event);
    }
  }

  moveRight() {
    if (this.x + 1 <= 100 - 5) {
      this.x += 1;
    }
  }

  moveLeft() {
    if (this.x - 1 >= 0) {
      this.x -= 1;
    }
  }

  on(event) {
    const handle = event.type;

    if (this[handle]) {
      this[handle]();
    }
  }

  gameover() {
    this.status = false;
  }
}
