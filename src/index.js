import PreloadState from 'states/PreloadState';
import Asteroids from 'states/Asteroids';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add('Asteroids', Asteroids, false);
		this.state.add('PreloadState', PreloadState, false);
		this.state.start('PreloadState');
	}

}

new Game();
