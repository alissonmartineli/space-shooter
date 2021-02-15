export default class Screen {
  static renderScreen(context, requestAnimationFrame, game) {
    context.clearRect(0, 0, 1000, 1000);

    if (game.player) {
      context.fillStyle = 'white';
      context.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
    }

    for (const shootId in game.shoots) {
      const shoot = game.shoots[shootId];
      context.fillStyle = 'red';
      context.fillRect(shoot.x, shoot.y, shoot.width, shoot.height);
    }

    for (const enemyId in game.enemies) {
      const enemy = game.enemies[enemyId];
      context.fillStyle = 'green';
      context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    requestAnimationFrame(() => {
      Screen.renderScreen(context, requestAnimationFrame, game);
    });
  }
}
