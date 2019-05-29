var Ball = function(context, frame) {
	this.initialize(context, frame);
	return this;
};
Ball.prototype = {
	mainContext: null,
	mainFrame: null,
	radius: 10,
	initX: 0,
	initY: 0,
	x: 0,
	y: 0,
	distanceX: 2,
	distanceY: -2,
	crashX: false,
	crashY: false,
	crashPaddle: false,
	crashBlock: false,
	
	initialize: function(context, frame) {
		this.mainContext = context;
		this.mainFrame = frame;
		this.x = parseInt(this.mainFrame.size.width / 2);
		this.y = parseInt(this.mainFrame.size.height / 2);
		this.initX = this.x%2;
		this.initY = this.y%2;
		if (this.distanceY > 0) {
            this.distanceY = -1 * this.distanceY;
        }
        this.crashX = false;
        this.crashY = false;
        this.crashPaddle = false;
        this.crashBlock = false;
	},
		
	draw: function() {
		this.mainContext.beginPath();
		this.mainContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.mainContext.fillStyle = '#0095dd';
		this.mainContext.fill();
		this.mainContext.closePath();
		
		if (this.x <= this.mainFrame.size.width && this.x >= 22) {
			this.crashX = false;
		} else {
			this.crashX = true;
		}
		if (this.crashX) {
			this.distanceX = -1*this.distanceX;
		}
		
		if (this.y <= this.mainFrame.size.height+38 && this.y >= 62 && !this.crashPaddle && !this.crashBlock) {
			this.crashY = false;
		} else {
			this.crashY = true;
		}
		if (this.crashY) {
			this.distanceY = -1*this.distanceY;
			this.crashPaddle = false;
			this.crashBlock = false;
		}
		
		this.x += this.distanceX;
		this.y += this.distanceY;
			
	},
	
	resize: function(mainFrame) {
		this.mainFrame = mainFrame;
		this.x = parseInt(this.mainFrame.size.width / 2);
		this.y = parseInt(this.mainFrame.size.height / 2);
	}
	
};