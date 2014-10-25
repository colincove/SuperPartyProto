SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, ['project/src/Player.js', 'project/src/Ghost.js', 'project/src/Level.js', 'project/src/Emitter.js', "project/src/stackBlur.js"]);
	
	Stage.canvas.height = 400;
	Stage.canvas.width = 800;
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

    var level = setupLevel();

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	Physics.startDebugDraw();

	var player = Player.createPlayer();
	Physics.gravity.y = 1.5;
	
	function draw()
    {
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle("rgb(0, 0, 0)");
		context.fill();
		stackBlurCanvasRGB( "stage", 0, 0, Stage.canvas.width, Stage.canvas.height, 20);

    }
    function update()
    {
    	 Stage.cam.x += ((player.body.transform.position.x-canvas.width/2)-Stage.cam.x)/5;
        Stage.cam.y += ((player.body.transform.position.y-canvas.height/2)-Stage.cam.y)/5;
    }
}