function getWorld(x, y, alt)
{
	var world = {};
	world.body = Physics.bodies.getCircle({radius:40, transform:{position:{x:x, y:y}}, isTrigger:true});
	
	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	world.fireRate	= 15;
	world.population = 10000000000;
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
		
		Stage.superContext.setFont("20px Georgia");
		Stage.superContext.setFillStyle("#ffffff");
		Stage.context.fillText(world.population,world.body.transform.position.x-50,world.body.transform.position.y-100);
	}
	
	function update(e)
	{
		fireTime += e.step*100;

		if(fireTime>lastFire+world.fireRate)
		{
			lastFire=fireTime;
			
			fire();
			
		}
	}
	
	function fire()
	{
		var missile = getMissile(world, world.target, alt);
	}
	
	world.body.addEventListener(Physics.EVENT_ON_ENTER, onCollide);
	
	function onCollide(e)
	{
		//if(e.target = target)
		//{
			//missile.destroy();
		//}
	}
	
	world.doDamage = function(strength)
	{
		world.population -= strength;
	}
	
	return world;
}