import Game from './src/Game.js';
import Player from './src/Player.js';
import Screen from './src/Screen.js';
import KeyBoardListener from './src/KeyBoardListener.js';

const btnStart = document.getElementById('btn-start');
const title = document.getElementById('title');
const gameOver = document.getElementById('game-over');

btnStart.addEventListener('click', () => {
  console.log('START');
  const keyBoardListener = new KeyBoardListener();
  const player = new Player();
  const game = new Game();

  const screen = document.getElementById('screen');
  const context = screen.getContext('2d');

  keyBoardListener.subscribe((e) => player.move(e));

  keyBoardListener.subscribe((e) => player.shoot(e));

  player.subscribe({type: 'shoot', handle: (e) => {game.addShoot(e)}});

  game.subscribe((e) => player.on(e));

  game.subscribe((e) => {
    if (e.type === 'gameover') {
      gameOver.style.display = 'block';
      btnStart.style.display = 'block';
    }
  });

  document.addEventListener('keydown', (e) => keyBoardListener.handleKeyPress(e));

  game.addPlayer(player);

  game.run();

  Screen.renderScreen(context, requestAnimationFrame, game);

  btnStart.style.display = 'none';
  gameOver.style.display = 'none';
  title.style.display = 'none';
})
