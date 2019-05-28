var Game = function(context) {
	this.initialize(context);
	return this;
};
Game.prototype = {
	mainContext: null,
	mainFrame: {
		size: {
			width: 0,
			height: 0
		}
	},
	initialize: function(context) {
		this.mainContext = context;
		this.makeFrame();
		this.makeStartButton();
	},
	
	makeFrame: function() {
		this.mainFrame.size.width = app.size.width/2;
		this.mainFrame.size.height = app.size.height - 100;
		this.mainContext.fillStyle = '#fff';
		this.mainContext.strokeStyle = '#222';
		this.mainContext.fillRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
		this.mainContext.strokeRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
		this.mainContext.clearRect(10,50,this.mainFrame.size.width, this.mainFrame.size.height);
	},
	
	makeStartButton: function() {
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
		this.mainContext.closePath();
	},
	
	resize: function() {
		this.makeFrame();
		this.makeStartButton();
	}
};