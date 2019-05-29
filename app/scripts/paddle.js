var Paddle = function(context, frame) {
	this.initialize(context, frame);
	return this;
};
Paddle.prototype = {
	mainContext: null,
	mainFrame: null,
	x: 0,
	y: 0,
	distanceX: 30,
	width: 75,
	height: 10,
	
	initialize: function(context, frame) {
		this.mainContext = context;
		this.mainFrame = frame;
		this.x = parseInt(this.mainFrame.size.width / 2 - this.width / 2);
		this.y = parseInt(this.mainFrame.size.height);
		
		this.draw();
		this.bindEvent();
	},
	
	draw: function() {
		this.mainContext.beginPath();
		this.mainContext.save();
		this.mainContext.translate(this.x, this.y);
		this.mainContext.rect(0, 0, this.width, this.height);
		this.mainContext.fillStyle = '#0095dd';
		this.mainContext.fill();
		this.mainContext.restore();
		this.mainContext.closePath();			
	},
	
	resize: function(mainFrame) {
		this.mainFrame = mainFrame;
		this.x = parseInt(this.mainFrame.size.width / 2 - this.width / 2);
		this.y = parseInt(this.mainFrame.size.height);
	},
	
	bindEvent: function() {
		var self = this;
		document.addEventListener('keydown', function(event) {
			var keyCode = event.keyCode || event.which;
			var distanceX = self.distanceX;
			if (keyCode == 39 || keyCode == 102) {
				if (self.mainFrame.size.width - self.width - self.x < self.distanceX) {
					distanceX = self.mainFrame.size.width - self.width - self.x + 10;
				}
				if (self.x > self.mainFrame.size.width - self.width) {
					return false;
				}
				self.x += distanceX;
			} else if (keyCode == 37 || keyCode == 100) {
				if (self.x - 10 < 10 ) {
					distanceX = 2;
				}
				if (self.x < 10) {
					return false;
				}
				self.x -= distanceX;
			}
			self.draw();
		}, false);
	}
	
};