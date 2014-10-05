SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, ['project/src/Player.js', 'project/src/Ghost.js', 'project/src/Level.js']);
	
	Stage.canvas.height = 400;
	Stage.canvas.width = 600;
}
function init()
{
	Resources.addEventListener(Resources.EVENT_ON_COMPELETE, startGame);
	
	Resources.addImage('testImage', 'project/res/3268850-master+chief+epicness.jpg');
	
	Resources.startLoad();
}
function startGame(e)
{
	var canvas 	= Stage.canvas;
    var context = Stage.superContext;

    setupLevel();

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	Physics.startDebugDraw();

	var player = Player.createPlayer();
	
	function draw()
    {
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle("rgb(0, 0, 0)");
		context.fill();


    }
    function update()
    {
    }
}