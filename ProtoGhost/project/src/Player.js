var Player = {};

Player.createPlayer = function()
{
	var player = {};

	fric = 1.2;

	//monster.body = Physics.bodies.getCircle({radius:8, isTrigger:false, damp:0.2});
	player.body = Physics.bodies.getBox({width:25, height:25, drag:1.005, isTrigger:false, collisionGroup:"player",  damp:15, transform:{position:{x:200, y:200}}});

	player.footTrigger = Physics.bodies.getBox({width:4, height:2, isTrigger:true});
	player.acc = 0.8;
	player.maxSpeed = 10;
	player.body.fric = fric;
	player.jumpStrength = 8;
	player.jumpRepeatStrength = 2;
    
    //pump
    player.pumpEmitter = Emitter.create();
    player.pumpEmitter.setPosition(0, 0);
    player.pumpEmitter.radius = 20;
    player.pumpEmitter.frequency = 100;
    player.pumpEmitter.gravity = {x:0, y:0.2};
    player.pumpEmitter.force=15;
    player.pumpEmitter.collisionGroup = "player";
    player.pumpEmitter.stop();

	//Gameplay
	player.suck = false;
	player.blow = false;
	player.burstPress = false;
	player.burst = false;
	player.dir = 1;

	var jumpRepeatMax = 7;
	var jumpRepeat = 0;

	var velocity = player.body.transform.velocity;
	var position = player.body.transform.position;
	var transform = player.body.transform;

	var directionInput = Input.getStandardDirectionInput({wasd:true});
	var keyboardInput = Input.getKeyInput();

	keyboardInput.addEventListener(Input.EVENT_KEY_DOWN, onKeyDown);
	keyboardInput.addEventListener(Input.EVENT_KEY_UP, onKeyUp);


	Looper.addEventListener(Looper.EVENT_DRAW_TICK, function(e)
	{
		var ctx = Stage.superContext;
		ctx.beginPath();
		ctx.setFillStyle("rgb(150, 150, 150)");
		ctx.rect(player.body.transform.position.x,player.body.transform.position.y,player.body.getWidth(),player.body.getHeight());
		ctx.fill();
	});

	directionInput.up.onPress = function()
	{
		/*if(canJump())
        {
        	jump(player.jumpStrength);
        	jumpRepeat++;
        }*/
	};

	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, function(e)
	{
		//place foot trigger on main body
		player.footTrigger.transform.setPosition(position.x+2, position.y+player.body.getHeight());

		player.body.fric = fric;

		if(player.body.transform.velocity.x>player.maxSpeed)
		{
			player.body.transform.velocity.x = player.maxSpeed;
		}
		if(player.body.transform.velocity.x<-player.maxSpeed)
		{
			player.body.transform.velocity.x = -player.maxSpeed;
		}
		if(player.body.transform.velocity.y>player.maxSpeed)
		{
			player.body.transform.velocity.y = player.maxSpeed;
		}
		if(player.body.transform.velocity.y<-player.maxSpeed)
		{
			player.body.transform.velocity.y = -player.maxSpeed;
		}
		if(directionInput.up.isDown)
        {
			if(canJump())
        {
        	jump(player.jumpStrength);
        	jumpRepeat++;
        } else if(jumpRepeat < jumpRepeatMax && jumpRepeat != 0)
        	{
        		jump(player.jumpRepeatStrength);
        		jumpRepeat++;
        	}
        }
        else
        {
        	jumpRepeat = 0;
        }
        if(directionInput.down.isDown)
        {
            player.body.transform.setVelocity(player.body.transform.velocity.x, player.body.transform.velocity.y+player.acc);
        }
        if(directionInput.right.isDown)
        {
        	player.dir = 1;
        	player.body.fric = 1;
           	player.body.transform.setVelocity(player.body.transform.velocity.x+player.acc, player.body.transform.velocity.y);
        }
        if(directionInput.left.isDown)
        {
        	player.dir = -1;
        	player.body.fric = 1;
            player.body.transform.setVelocity(player.body.transform.velocity.x-player.acc, player.body.transform.velocity.y);
        }
        player.pumpEmitter.x = player.body.transform.position.x;
        player.pumpEmitter.y = player.body.transform.position.y;
	});

	

	function onKeyDown(e)
	{
		//P: 80, O: 79
		if(e.keyCode == 80)
		{
			doBlow();
		}
		else if(e.keyCode == 79)
		{
			doSuck();
		}
		console.log(e.keyCode);

		if(e.keyCode == 32 && !player.burstPress)
		{
			player.burstPress = true;
			player.burst = true;
		}
	}
	function onKeyUp(e)
	{
		//P: 80, O: 79
		if(e.keyCode == 80)
		{
			stopBlow();
		}
		else if(e.keyCode == 79)
		{
			stopSuck();
		}
		if(e.keyCode == 32)
		{
			player.burstPress = false;
		}
	}

	function doBlow()
	{
		if(!player.suck)
		{
            player.pumpEmitter.start();
			player.blow = true;
		}
	}
	function doSuck()
	{
		if(!player.blow)
		{
			player.suck = true;
		}
	}
	function stopSuck()
	{
		player.suck = false;
		
	}
	function stopBlow()
	{
        player.pumpEmitter.stop();
		player.blow = false;
	}

	function canJump()
	{
		for(var i in player.footTrigger.collisionTable)
		{
			var body = player.footTrigger.collisionTable[i];
			if(body.collisionGroup == "ground")
			{
				return true;
			}
		}
		return false;
	}

	function jump(strength)
	{
		player.body.transform.setVelocity(player.body.transform.velocity.x, player.body.transform.velocity.y-strength);
	}

	return player;
}