class SimpleText extends Phaser.Text {
    constructor(game, x, y, text){
        super(game, x, y, text, { font: "30px Arial", fill: "#ffffff", align: "center" });
        this.game.stage.addChild(this);
    }
}

export default SimpleText;
