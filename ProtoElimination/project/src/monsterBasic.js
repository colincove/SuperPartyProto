function createMonsterBasic(config)
{
	var monster = $.extend(true, {},config);
	
	monster.body = Physics.bodies.getCircle({radius:8, isTrigger:false, damp:0.2});
	monster.acc = 0.5;
	monster.maxSpeed = 20;
	monster.fric = 1.05;
	Looper.addEventListener(Looper.EVENT_DRAW_TICK, function(e)
	{
		Stage.superContext.drawImage(R.drawable.monster, monster.body.transform.position.x, monster.body.transform.position.y, 20,20);
	});
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, function(e)
	{
		monster.body.transform.setVelocity(monster.body.transform.velocity.x/monster.fric, monster.body.transform.velocity.y/monster.fric);
		if(monster.body.transform.velocity.x>monster.maxSpeed)
		{
			monster.body.transform.velocity.x = monster.maxSpeed;
		}
		if(monster.body.transform.velocity.x<-monster.maxSpeed)
		{
			monster.body.transform.velocity.x = -monster.maxSpeed;
		}
		if(monster.body.transform.velocity.y>monster.maxSpeed)
		{
			monster.body.transform.velocity.y = monster.maxSpeed;
		}
		if(monster.body.transform.velocity.y<-monster.maxSpeed)
		{
			monster.body.transform.velocity.y = -monster.maxSpeed;
		}
	});
	
	
	
	return monster;
}
function createUserMonster(config)
{
	var monster =  $.extend(true, createMonsterBasic(), config);
	
	var directionInput = Input.getStandardDirectionInput({wasd:true});
	
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, function(e)
	{
		console.log(monster.body.transform.velocity);
		if(directionInput.up.isDown)
        {
			monster.body.transform.setVelocity(monster.body.transform.velocity.x, monster.body.transform.velocity.y-monster.acc);
        }
          if(directionInput.down.isDown)
        {
            monster.body.transform.setVelocity(monster.body.transform.velocity.x, monster.body.transform.velocity.y+monster.acc);
        }
        if(directionInput.right.isDown)
        {
           monster.body.transform.setVelocity(monster.body.transform.velocity.x+monster.acc, monster.body.transform.velocity.y);
        }
        if(directionInput.left.isDown)
        {
            monster.body.transform.setVelocity(monster.body.transform.velocity.x-monster.acc, monster.body.transform.velocity.y);
        }
	});
	return monster;
}