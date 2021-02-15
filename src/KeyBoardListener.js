export default class KeyBoardListener {
  constructor() {
    this.observers = [];
  }

  subscribe(observerFunction) {
    this.observers.push(observerFunction);
  }

  notifyAll(event) {
    this.observers.forEach((observerFunction) => observerFunction(event));
  }

  handleKeyPress(e) {
    const keyPressed = e.key;
    const event = {
      keyPressed,
    };

    this.notifyAll(event);
  }
}
