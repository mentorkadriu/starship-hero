(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _PreloadState = require('states/PreloadState');

var _PreloadState2 = _interopRequireDefault(_PreloadState);

var _Asteroids = require('states/Asteroids');

var _Asteroids2 = _interopRequireDefault(_Asteroids);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 500, 500, Phaser.AUTO, 'content', null));

		_this.state.add('Asteroids', _Asteroids2.default, false);
		_this.state.add('PreloadState', _PreloadState2.default, false);
		_this.state.start('PreloadState');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/Asteroids":3,"states/PreloadState":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var SimpleText = function (_Phaser$Text) {
    _inherits(SimpleText, _Phaser$Text);

    function SimpleText(game, x, y, text) {
        _classCallCheck(this, SimpleText);

        var _this = _possibleConstructorReturn(this, (SimpleText.__proto__ || Object.getPrototypeOf(SimpleText)).call(this, game, x, y, text, { font: "30px Arial", fill: "#ffffff", align: "center" }));

        _this.game.stage.addChild(_this);
        return _this;
    }

    return SimpleText;
}(Phaser.Text);

exports.default = SimpleText;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Asteroids = function (_Phaser$State) {
    _inherits(Asteroids, _Phaser$State);

    function Asteroids() {
        _classCallCheck(this, Asteroids);

        return _possibleConstructorReturn(this, (Asteroids.__proto__ || Object.getPrototypeOf(Asteroids)).apply(this, arguments));
    }

    _createClass(Asteroids, [{
        key: 'init',
        value: function init() {
            this.sprite = null;
            this.weapon = null;
            this.cursors = null;
            this.fireButton = null;
        }
    }, {
        key: 'create',
        value: function create() {
            this.weapon = this.game.add.weapon(30, 'bullet');
            this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            this.weapon.bulletSpeed = 600;
            this.weapon.fireRate = 100;

            this.sprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
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
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {
            this.weapon.debug();
        }
    }]);

    return Asteroids;
}(Phaser.State);

exports.default = Asteroids;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _SimpleText = require('objects/SimpleText');

var _SimpleText2 = _interopRequireDefault(_SimpleText);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var PreloadState = function (_Phaser$State) {
    _inherits(PreloadState, _Phaser$State);

    function PreloadState() {
        _classCallCheck(this, PreloadState);

        return _possibleConstructorReturn(this, (PreloadState.__proto__ || Object.getPrototypeOf(PreloadState)).apply(this, arguments));
    }

    _createClass(PreloadState, [{
        key: 'init',
        value: function init() {
            this.x = null;
            this.y = null;
            this.loadingText = new _SimpleText2.default(this.game, this.game.world.centerX, this.game.world.centerY, 'Loading');
            this.loadingText.anchor.set(0.5);
            this.game.load.onLoadStart.add(this.loadStart, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(this.loadComplete, this);
        }
    }, {
        key: 'preload',
        value: function preload() {
            this.game.load.image('bullet', 'assets/sprites/shmup-bullet.png');
            this.game.load.image('ship', 'assets/sprites/thrust_ship.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.stage.backgroundColor = '#182d3b';
            this.game.state.start("Asteroids");
        }
    }, {
        key: 'update',
        value: function update() {

            //show loading in percentage, magic
            if (this.loadingProcess != null && this.loadingProcess.loadingProcessInPercentage != null) {
                this.loadingProcess.loadingProcessInPercentage.text = this.game.load.progress + ' %';
            }
        }
    }, {
        key: 'loadStart',
        value: function loadStart() {
            console.log('Loading...');
            this.loadingText.setText('Loading...');
        }
    }, {
        key: 'fileComplete',
        value: function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

            this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

            var newImage = this.game.add.image(this.x, this.y, cacheKey);

            newImage.scale.set(0.3);

            this.x += newImage.width + 20;

            if (this.x > 700) {
                this.x = 32;
                this.y += 332;
            }
        }
    }, {
        key: 'loadComplete',
        value: function loadComplete() {
            console.log('Loading Complete!');
        }
    }]);

    return PreloadState;
}(Phaser.State);

exports.default = PreloadState;

},{"objects/SimpleText":2}]},{},[1])
//# sourceMappingURL=game.js.map
