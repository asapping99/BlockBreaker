var Game = function(context) {
	this.initialize(context);
	return this;
};
Game.prototype = {
	mainContext: null,
	processing: null,
	interval: 10,
	ball: null,
	paddle: null,
	blocks: null,
	rowsBlock: 2,
	colsBlock: 2,
	totalBlock: 0,
	countStage: 1,
	score: 0,
	
	mainFrame: {
		size: {
			width: 0,
			height: 0
		}
	},
	initialize: function(context) {
		this.ball = null;
		this.paddle = null;
		this.totalBlock = this.rowsBlock * this.colsBlock;
		this.mainContext = context;
		this.makeFrame();
		this.makeStartButton();
		this.bindEvents();
	},
	
	makeFrame: function() {
		this.mainFrame.size.width = app.size.width/2;
		this.mainFrame.size.height = app.size.height - 100;
		this.mainContext.beginPath();
		this.mainContext.fillStyle = '#fff';
		this.mainContext.strokeStyle = '#222';
		this.mainContext.fillRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
		this.mainContext.strokeRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
		this.mainContext.clearRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
		this.mainContext.closePath();
	},
	
	makeStartButton: function() {
		this.startBtn = document.createElement('button');
		this.startBtn.id = 'startBtn';
		document.getElementsByTagName("BODY")[0].appendChild(this.startBtn);
		var startButtonW = this.mainFrame.size.width/4;
		var startButtonH = this.mainFrame.size.height/15;
		var startButtonX = (this.mainFrame.size.width-startButtonW)/2;
		var startButtonY = (this.mainFrame.size.height-startButtonH)/2;
		var startText = 'START';
		
		this.mainContext.beginPath();
		this.mainContext.font = '20px serif';
		this.mainContext.strokeStyle = '#00f';
		this.mainContext.fillRect(startButtonX, startButtonY, startButtonW, startButtonH);
		this.mainContext.strokeRect(startButtonX, startButtonY, startButtonW, startButtonH);
		this.mainContext.clearRect(startButtonX, startButtonY, startButtonW, startButtonH);
		
		var startButtonText = this.mainContext.measureText(startText);
		this.mainContext.fillStyle = '#222';
		this.mainContext.fillText(startText, startButtonX + (startButtonW-startButtonText.width)/2, startButtonY + (startButtonH)/2+5);
		
		this.startBtn.style.width = startButtonW;
		this.startBtn.style.height = startButtonH;
		this.startBtn.style.top = startButtonY+8;
		this.startBtn.style.left = startButtonX+8;
		
		this.mainContext.closePath();
	},
	
	makeBlocks: function() {
	    this.blocks = null;
		this.blocks = new Array(this.colsBlock);
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i] = new Array(this.rowsBlock);
			for (var j = 0; j < this.blocks[i].length; j++) {
				this.blocks[i][j] = new Block(this.mainContext, this.mainFrame);
			}
		}
	},
	
	bindEvents: function() {
		this.startBtn.addEventListener('click', this.start.bind(this));
		this.startBtn.removeEventListener('click', this.start);
	},

	resize: function() {
		this.makeFrame();
		this.makeStartButton();
		if (this.ball) {
			this.ball.resize(this.mainFrame);
		}
		if (this.paddle) {
			this.paddle.resize(this.mainFrame);
		}
	},
	
	start: function(event) {
		var self = this;
		this.mainContext.beginPath();
		this.makeFrame();
		this.mainContext.closePath();
		this.makeBlocks();
		
		if (!this.ball) {
			this.ball = new Ball(this.mainContext, this.mainFrame);
		}
		if (!this.paddle) {
			this.paddle = new Paddle(this.mainContext, this.mainFrame);
		}

	    this.showScore();
	    this.showStage();
		this.processing = setInterval(function() {
			self.draw();
		}, this.interval);
	},
	
	draw: function() {
		this.mainContext.clearRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
		this.drawBlocks();
		this.ball.draw();
		this.paddle.draw();
		this.collisionPaddle();
	},
	
	drawBlocks: function() {
		var width = parseInt((this.mainFrame.size.width - (this.colsBlock * 10) - 30) / this.colsBlock);
		var height = 20;
		var colsDistance = 20;
		var rowsDistance = 20;
		var initX = 10;
		var initY = 80;
		var x = initX;
		var y = initY;
		for (var i = 0; i < this.blocks.length; i++) {
			x = initX;
			if (i != 0) {
				y = y + (rowsDistance + height);	
			}
			for (var j = 0; j < this.blocks[i].length; j++) {
				if (j != 0) {
					x = x + colsDistance + width;
				}
				if (this.blocks[i][j].isLive) {
					this.blocks[i][j].setAttrs(x,y,width,height);
					this.blocks[i][j].draw();					
				}
			}
		}
	},
	
	end: function() {
		var self = this;
        alert("The End!!");
		if (this.startBtn) {
			this.startBtn.remove();
		}
		clearInterval(this.processing);
		app.game = null;
		initialize();
	},

	nextStage: function() {
	    var currentStage = this.countStage;
	    clearInterval(this.processing);
        this.countStage = this.countStage + 1;
        this.showStage();

        if (this.rowsBlock <= 6) {
            this.rowsBlock = this.rowsBlock + 2;
        }
        if (this.colsBlock <= 14) {
            this.colsBlock = this.colsBlock + 2;
        }
        this.totalBlock = this.rowsBlock * this.colsBlock;

        if (this.ball) {
            if (this.countStage == 10) {
                this.ball.distanceX = this.ball.distanceX + 1;
                this.ball.distanceY = this.ball.distanceY - 1;
            }
            this.ball.initialize(this.mainContext, this.mainFrame);
        }
        if (this.paddle) {
            this.paddle.initialize(this.mainContext, this.mainFrame);
        }

        alert("Stage " + currentStage + ' Clear!!');
        this.start();
	},

    showScore: function() {
        var scoreText = 'SCORE : ' + this.score;
        var scoreTextSize = this.mainContext.measureText(scoreText);
        this.mainContext.beginPath();
        this.mainContext.clearRect(10, 0, scoreTextSize.width, 40);
        this.mainContext.fillStyle = '#dfdfdf';
        this.mainContext.fillRect(10, 0, scoreTextSize.width, 40);
        this.mainContext.closePath();

        this.mainContext.beginPath();
        this.mainContext.fillStyle = '#222';
        this.mainContext.fillText(scoreText, 10, 40);
        this.mainContext.closePath();
    },

    showStage: function() {
        var stageText = 'STAGE : ' + this.countStage;
        var stageTextSize = this.mainContext.measureText(stageText);
        this.mainContext.beginPath();
        this.mainContext.clearRect(this.mainFrame.size.width - stageTextSize.width, 0, stageTextSize.width, 40);
        this.mainContext.fillStyle = '#dfdfdf';
        this.mainContext.fillRect(this.mainFrame.size.width - stageTextSize.width, 0, stageTextSize.width, 40);
        this.mainContext.closePath();

        this.mainContext.beginPath();
        this.mainContext.fillStyle = '#222';
        this.mainContext.fillText(stageText, this.mainFrame.size.width - stageTextSize.width, 40);
        this.mainContext.closePath();
    },

	collisionPaddle: function() {
		for (var i = 0; i < this.blocks.length; i++) {
			for (var j = 0; j < this.blocks[i].length; j++) {
				var blockX = this.blocks[i][j].x;
				var blockY = this.blocks[i][j].y;
				var blockW = this.blocks[i][j].width;
				var blockH = this.blocks[i][j].height;
				if (this.ball.x >= blockX && this.ball.x <= blockX + blockW + 10 && this.ball.y - blockH - 5 <= blockY) {
					this.ball.crashBlock = true;
					this.blocks[i][j].remove();
					this.totalBlock = this.totalBlock - 1;
					this.score = this.score + 100;
					this.showScore();
					if (this.totalBlock == 0) {
					    if (this.countStage == 15) {
					        this.end();
					    } else {
						    this.nextStage();
					    }
					}
					break;
				}
			}
		}
		
		if (this.ball.x > this.paddle.x && 
		    this.ball.x < (this.paddle.x + this.paddle.width) &&
			this.ball.y > this.paddle.y && this.ball.y < this.paddle.y + 5) {
			this.ball.crashPaddle = true;
		} else if (this.ball.y >= this.mainFrame.size.height+30) {
			this.end();
		}
	}
};