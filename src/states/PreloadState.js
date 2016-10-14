import SimpleText from 'objects/SimpleText';

class PreloadState extends Phaser.State {

    init(){
        this.x = null;
        this.y = null;
        this.loadingText = new SimpleText(this.game, this.game.world.centerX, this.game.world.centerY, 'Loading');
        this.loadingText.anchor.set(0.5);
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
    }

    preload(){
        this.game.load.image('bullet', 'assets/sprites/shmup-bullet.png');
        this.game.load.image('ship', 'assets/sprites/thrust_ship.png');
    }



    create(){
        this.game.stage.backgroundColor = '#182d3b';
        this.game.state.start("Asteroids");
    }

    update() {

        //show loading in percentage, magic
        if(this.loadingProcess != null && this.loadingProcess.loadingProcessInPercentage != null) {
            this.loadingProcess.loadingProcessInPercentage.text = this.game.load.progress + ' %';
        }
    }
    loadStart(){
        console.log('Loading...');
        this.loadingText.setText('Loading...');
    }
    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

        this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

        var newImage = this.game.add.image(this.x, this.y, cacheKey);

        newImage.scale.set(0.3);

        this.x += newImage.width + 20;

        if (this.x > 700)
        {
            this.x = 32;
            this.y += 332;
        }

    }
    loadComplete(){
        console.log('Loading Complete!');
    }
}

export  default PreloadState;
