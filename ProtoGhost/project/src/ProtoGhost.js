SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, [
		'project/src/Player.js', 
		'project/src/Ghost.js', 
		'project/src/Level.js', 
		'project/src/Emitter.js', 
		'project/src/stackBlur.js', 
		'project/src/metabalize.js', 
		'project/src/pump.js']);
	
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
    //document.getElementsByTagName('body')[0].appendChild(tmpCanvas);
    var tmpCtx = tmpCanvas.getContext("2d");

    var bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = Stage.canvas.width;
    bufferCanvas.height = Stage.canvas.height;
    bufferCanvas.setAttribute("id", "tmp-canvas");
    //document.getElementsByTagName('body')[0].appendChild(bufferCanvas);
    var bufferCtx = bufferCanvas.getContext("2d");

    

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	var level = setupLevel();

	//Physics.startDebugDraw();

	//Looper.addEventListener(Looper.EVENT_DRAW_TICK, blurScreen);

	var player = Player.createPlayer();
	Physics.gravity.y = 1.5;
	var pump = Pump.create(player);

	//liquid push values
	var pushRadius = 50;
	var pushStrength = 3;

	var burstRadius = 100;
	var burstStrength = 20;
	
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
		tmpCtx.fillStyle = "rgb(0, 0, 0)";
		tmpCtx.fill();

		//tmpCtx.clearRect ( 0 , 0 , canvas.width , canvas.height );
		
		for(var i in Emitter.emitters)
		{
			var emitter = Emitter.emitters[i];
			if(!emitter.active)continue;
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
				grd.addColorStop(0,'rgba(255, 255, 255,1)');
				grd.addColorStop(1,'rgba(255, 255, 255, 0)');


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
		metabalize(bufferCtx, tmpCtx, Stage.canvas.width, Stage.canvas.height, 200);
		//metabalize(Stage.canvas, tmpCanvas, Stage.canvas.width, Stage.canvas.height, 200);
		var imgData = bufferCtx.getImageData(0,0,Stage.canvas.width,Stage.canvas.height);
		 var d = imgData.data;
		 var d2 = Stage.context.getImageData(0,0,Stage.canvas.width,Stage.canvas.height).data;
		  for (var i=0; i<d.length; i+=4) 
		  {
		  	if(d[i]==0)
	  		{
	  			d[i] = d2[i];
	  			d[i+1] = d2[i+1];
	  			d[i+2] = d2[i+2];
	  		}
		    /*var r = d[i];
		    var g = d[i+1];
		    var b = d[i+2];
		    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
		    d[i] = d[i+1] = d[i+2] = v*/
		  }
		  Stage.context.putImageData(imgData, 0, 0); 

    }
    function blurScreen(e)
    {
		stackBlurCanvasRGB( "stage", 0, 0, Stage.canvas.width, Stage.canvas.height, 10);
    }
    function update(e)
    {
    	 Stage.cam.x += ((player.body.transform.position.x-canvas.width/2)-Stage.cam.x)/5;
        Stage.cam.y += ((player.body.transform.position.y-canvas.height/2)-Stage.cam.y)/5;

        for(var i in Emitter.emitters)
		{
			var emitter = Emitter.emitters[i];
			if(!emitter.active)continue;
			for(var j in emitter.nodes)
			{
				var body = emitter.nodes[j];
				var dx = body.transform.position.x - player.body.transform.position.x;
				var dy = body.transform.position.y - player.body.transform.position.y;
				var dist = Math.sqrt(dx * dx + dy * dy);
				if(dist<pushRadius)
				{
					var a = Math.atan2(dy, dx);

					var strength = pushStrength - (pushStrength * (dist / pushRadius))


					player.body.transform.setVelocity(
						player.body.transform.velocity.x + Math.cos(a - Math.PI) * strength, 
						player.body.transform.velocity.y + Math.sin(a - Math.PI) * strength
						);
					body.transform.setVelocity(
						body.transform.velocity.x + Math.cos(a) * strength*2, 
						body.transform.velocity.y + Math.sin(a) * strength*2
						);
				}

				if(dist<burstRadius && player.burst)
				{
					var a = Math.atan2(dy, dx);

					var strength = burstStrength - (burstStrength * (dist / burstRadius))

					body.transform.setVelocity(
						body.transform.velocity.x + Math.cos(a) * strength*2, 
						body.transform.velocity.y + Math.sin(a) * strength*2
						);
				}

			}
			
		}
		 player.burst = false;
    }
}