function getMouseClicker(world)
{
	var clicker = {};
	
	var radius = 12;
	
	clicker.body = Physics.bodies.getCircle({radius:radius, transform:{position:{x:0, y:0}}, static:false, isTrigger:true});
	
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	var mouseX = 0;
	var mouseY = 0;
	
	
	
	document.addEventListener('mousemove', function(e)
	{ 
		mouseX = e.clientX || e.pageX; 
		mouseY = e.clientY || e.pageY;
	}, false);
	
	Stage.canvas.addEventListener('click', onClick, false);
	
	function onClick(e)
	{
		for(var i in clicker.body.collisionTable)
		{
			var body = clicker.body.collisionTable[i];
			
			if(body.isMissile && body.missile.owner != world)
			{
				explode(body.transform.position.x, body.transform.position.y);
				body.missile.explode();
			}
		}
	}
	
	function update(e)
	{
		clicker.body.transform.setPosition(mouseX-radius, mouseY-radius);
	}
	
	function explode(x, y)
	{
		var i=0;
		function doExplode()
		{
			i++;
			
			var newx = x+(Math.random()*10-Math.random()*10);
			var newy = y+(Math.random()*10-Math.random()*10);
			
			var r = 1+Math.random()*5;
			
			Stage.superContext.beginPath();
			Stage.superContext.arc(newx,newy, r, 0, 2 * Math.PI, false);
			Stage.superContext.setFillStyle("#ffffff");
			Stage.superContext.fill();
			Stage.superContext.setLineWidth(1);
			Stage.superContext.setStrokeStyle("#ffffff");
			Stage.superContext.stroke();
			
			if(i<4)
			{
				setTimeout(doExplode, 25);
			}
		}
		doExplode();
		setTimeout(doExplode, 25);
	}
	
	return clicker;
}