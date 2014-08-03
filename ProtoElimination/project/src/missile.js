function getMissile(owner, target)
{
	var missile = {};
	
	missile.body = Physics.bodies.getCircle({radius:3, transform:{position:{x:owner.body.transform.position.x, y:owner.body.transform.position.y}}, isTrigger:true});
	
	missile.owner = owner;
	
	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	var dir = owner.body.transform.position.x>target.body.transform.position.x ? 1:-1;
	var speed  = 2;
	
	function draw(e)
	{
		
	}
	function update(e)
	{
		//missile.body.transform.setPosition(missile.body.transform.position.x+speed*dir, missile.body.transform.position.y
	}
}