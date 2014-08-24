SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, ['project/src/DemoLevel.js', 'project/src/monsterBasic.js', 'project/src/World.js', 'project/src/missile.js', 'project/src/mouseClicker.js']);
	
	Stage.canvas.height = 300;
	Stage.canvas.width = 550;
}
function init()
{
	Resources.addEventListener(Resources.EVENT_ON_COMPELETE, startGame);
	
	Resources.addImage('testImage', 'project/res/3268850-master+chief+epicness.jpg');
	Resources.addImage('world', 'project/res/world.png');
	Resources.addImage('starPattern', 'project/res/star_pattern.jpg');
	
	Resources.startLoad();
}
function startGame(e)
{
	setupLevel();
	var canvas 	= Stage.canvas;
    var context = Stage.superContext;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	//Physics.startDebugDraw();
	
	var world1 = getWorld(100,150, true);
	var world2 = getWorld(450,150, false);
	
	world1.target = world2;
	world2.target = world1;
	
	//reset canvas
	Stage.context.rect(0,0,canvas.width,canvas.height);
	context.setFillStyle("rgba(0, 0, 0)");
	context.fill();
	
	mouseClicker = getMouseClicker();
	
	function draw()
    {
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle("rgba(0, 0, 0, 0.05)");
		context.fill();
    }
    function update()
    {
    }
}