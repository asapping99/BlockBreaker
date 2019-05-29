var Block = function(context, frame) {
	this.initialize(context, frame);
	return this;
};
Block.prototype = {
	mainContext: null,
	mainFrame: null,
	width: 0,
	height: 0,
	x: 0,
	y: 0,
	isLive: true,
	
	initialize: function(context, frame) {
		this.mainContext = context;
		this.mainFrame = frame;
	},
	
	setAttrs: function(x,y,w,h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	},
		
	draw: function() {
		this.mainContext.beginPath();
		this.mainContext.fillStyle = '#0095dd';
		this.mainContext.fillRect(this.x, this.y, this.width, this.height);
		this.mainContext.closePath();	
	},
	
	remove: function() {
		this.mainContext.clearRect(this.x, this.y, this.width, this.height);
		this.isLive = false;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}
};