function getMissile(owner, target, alt)
{
	var missile = {};
	
	var dead = false;
	
	var color = alt ? "#ffc9c9":"#cac9ff";
	
	missile.body = Physics.bodies.getCircle({radius:3, transform:{position:{x:owner.body.transform.position.x, y:owner.body.transform.position.y}}, static:false});
	missile.body.isMissile = true;
	missile.body.missile = missile;
	
	missile.owner = owner;
	
	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	var dir 	= owner.body.transform.position.x>target.body.transform.position.x ? -1:1;
	var speed  	= 2;
	var dist  	=  Math.abs(owner.body.transform.position.x-target.body.transform.position.x);
	
	var lastX = owner.body.transform.position.x;
	var lastY = owner.body.transform.position.y;
	
	var curve = 130*Math.random()-130*Math.random();
	
	target.body.addEventListener(Physics.EVENT_ON_ENTER, onCollide);
	missile.body.addEventListener(Physics.EVENT_ON_ENTER, onMissileCollide);
	
	function onMissileCollide(e)
	{
		if(dead)return;
		
		if(e.target.isMissile)
		{
			missile.explode(false);
			e.other.missile.explode(false);
		}
	}
	
	function onCollide(e)
	{
		if(dead)return;
		if(e.other == missile.body)
		{
			target.doDamage(10000000+Math.round(100*Math.random()));
			missile.explode(true);
		}
	}
	function draw(e)
	{
		if(dead)return;
		Stage.superContext.setStrokeStyle(color);
		Stage.superContext.setLineWidth(1);
	
		Stage.superContext.beginPath();
		Stage.superContext.moveTo(lastX, lastY);
		Stage.superContext.lineTo(missile.body.transform.position.x, missile.body.transform.position.y);
		Stage.superContext.stroke();
		
		lastX = missile.body.transform.position.x;
		lastY = missile.body.transform.position.y;
	}
	function update(e)
	{
		if(dead)return;
		missile.body.transform.setPosition(missile.body.transform.position.x+speed*dir, Math.sin((owner.body.transform.position.x-missile.body.transform.position.x)/120)*curve+owner.body.transform.position.y);
	}
	missile.explode = function(big)
	{
		if(big == true)
		{
			Stage.superContext.beginPath();
			Stage.superContext.arc(missile.body.transform.position.x, missile.body.transform.position.y, 10, 0, 2 * Math.PI, false);
			Stage.superContext.setFillStyle(color);
			Stage.superContext.fill();
			Stage.superContext.setLineWidth(1);
			Stage.superContext.setStrokeStyle(color);
			Stage.superContext.stroke();
		}
		else
		{
			Stage.superContext.beginPath();
			Stage.superContext.arc(missile.body.transform.position.x, missile.body.transform.position.y, 3, 0, 2 * Math.PI, false);
			Stage.superContext.setFillStyle(color);
			Stage.superContext.fill();
			Stage.superContext.setLineWidth(1);
			Stage.superContext.setStrokeStyle(color);
			Stage.superContext.stroke();
		}
		missile.destroy();
	}
	missile.destroy = function()
	{
		Physics.bodies.destroyBody(missile.body);
		dead=true;
	}
}