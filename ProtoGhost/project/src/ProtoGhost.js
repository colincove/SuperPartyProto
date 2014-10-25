SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, [
		'project/src/Player.js', 
		'project/src/Ghost.js', 
		'project/src/Level.js', 
		'project/src/Emitter.js', 
		'project/src/stackBlur.js', 
		'project/src/metabalize.js']);
	
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

    var tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = Stage.canvas.width;
    tmpCanvas.height = Stage.canvas.height;
    tmpCanvas.setAttribute("id", "tmp-canvas");
    document.getElementsByTagName('body')[0].appendChild(tmpCanvas);
    var tmpCtx = tmpCanvas.getContext("2d");

    var bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = Stage.canvas.width;
    bufferCanvas.height = Stage.canvas.height;
    bufferCanvas.setAttribute("id", "tmp-canvas");
    document.getElementsByTagName('body')[0].appendChild(bufferCanvas);
    var bufferCtx = bufferCanvas.getContext("2d");

    var level = setupLevel();

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	Physics.startDebugDraw();

	//Looper.addEventListener(Looper.EVENT_DRAW_TICK, blurScreen);

	var player = Player.createPlayer();
	Physics.gravity.y = 1.5;
	
	function draw(e)
    {
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle("rgb(0, 0, 0)");
		context.fill();

		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		bufferCtx.fillStyle = "rgb(0, 0, 0)";
		bufferCtx.fill();

		tmpCtx.rect(0,0,canvas.width,canvas.height);
		tmpCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
		tmpCtx.fill();

		//tmpCtx.clearRect ( 0 , 0 , canvas.width , canvas.height );
		
		for(var i in Emitter.emitters)
		{
			var emitter = Emitter.emitters[i];
			for(var j in emitter.nodes)
			{
				var body = emitter.nodes[j];
				tmpCtx.beginPath();

				var r = 40;

				var grd=tmpCtx.createRadialGradient(
					body.transform.position.x-Stage.cam.x,
					body.transform.position.y-Stage.cam.y,
					1,
					body.transform.position.x-Stage.cam.x,
					body.transform.position.y-Stage.cam.y,
					r);
				grd.addColorStop(0,'rgba(255, 0, 255,1)');
				grd.addColorStop(1,'rgba(255, 0, 255, 0)');


				// Fill with gradient
				tmpCtx.fillStyle = grd;
				//ctx.fillRect(10,10,150,100);


				tmpCtx.arc(
					body.transform.position.x-Stage.cam.x, 
					body.transform.position.y-Stage.cam.y,
					r,
					0, 
					2*Math.PI, 
					false);
				
				

				tmpCtx.fill();
			}
			
		}
		//Filters.threshold(tmpCtx.getImageData(0,0,Stage.canvas.width,Stage.canvas.height), 200);
		metabalize(bufferCtx, tmpCtx, Stage.canvas.width, Stage.canvas.height, 50);
		//metabalize(Stage.canvas, tmpCanvas, Stage.canvas.width, Stage.canvas.height, 200);

    }
    function blurScreen(e)
    {
		stackBlurCanvasRGB( "stage", 0, 0, Stage.canvas.width, Stage.canvas.height, 10);
    }
    function update(e)
    {
    	 Stage.cam.x += ((player.body.transform.position.x-canvas.width/2)-Stage.cam.x)/5;
        Stage.cam.y += ((player.body.transform.position.y-canvas.height/2)-Stage.cam.y)/5;
    }
}