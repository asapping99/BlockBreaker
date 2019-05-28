var app = {
	context: null,
	game: null,
	size: {
		width: window.innerWidth - 20,
		height: window.innerHeight - 20
	}
};

var execute = function() {
	app.context = mainApp.getContext('2d');
	resizeApp();
	initialize();
};

var resizeApp = function() {	
	mainApp.width = window.innerWidth - 20;
	mainApp.height = window.innerHeight - 20;
	app.size.width = mainApp.width;
	app.size.height = mainApp.height;
	
	app.context.fillStyle = '#dfdfdf';
	app.context.fillRect(0,0,app.size.width,app.size.height);
	
	if (app.game != null) {
		app.game.resize();
	}
};

var initialize = function() {
	// 게임화면 초기화
	if (app.game == null) {
		app.game = new Game(app.context);
	}
};

window.addEventListener('resize', resizeApp);