function getWorld(x, y)
{
	var world = {};
	world.body = Physics.bodies.getCircle({radius:40, transform:{position:{x:x, y:y}}, isTrigger:true});
	
	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	world.fireRate	= 100;
	
	var lastFire 	= 0;
	var fireTime 	= 0;
	
	function draw(e)
	{
		Stage.superContext.drawImage(
			R.drawable.world, 
			world.body.transform.position.x-world.body.radius, 
			world.body.transform.position.y-world.body.radius, 
			world.body.getHeight(), 
			world.body.getWidth());
	}
	
	function update(e)
	{
		fireTime += e.step;
		
		if(fireTime>lastFire)
		{
			lastFire=fireTime;
			
			fire();
			
		}
	}
	
	function fire()
	{
		var missile = getMissile(world, world.target);
	}
	return world;
}