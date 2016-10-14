class Asteroids extends Phaser.State {
    init(){
        this.sprite = null;
        this.weapon = null;
        this.cursors = null;
        this.fireButton = null;
    }
    create(){
        this.weapon = this.game.add.weapon(30, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 100;

        this.sprite = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'ship'
        );
        this.sprite.anchor.set(0.5);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.drag.set(30);
        this.sprite.body.maxVelocity.set(200);
        //  Tell the Weapon to track the 'player' Sprite
        //  With no offsets from the position
        //  But the 'true' argument tells the weapon to track sprite rotation
        this.weapon.trackSprite(this.sprite, 0, 0, true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    }
    update(){

    }
    render(){
        this.weapon.debug();
    }
}
export default Asteroids;