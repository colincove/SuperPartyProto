function setupLevel()
{
	var level = {bodies:[]};

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);

	var testBody  = Physics.bodies.getBox({height:30, width:500, static:true, collisionGroup:"ground", transform:{position:{x:30, y:300}}});


	level.testBody = testBody;
	level.bodies.push(testBody);

	//platform 1
	testBody  = Physics.bodies.getBox({height:30, width:100, static:true, collisionGroup:"ground", transform:{position:{x:300, y:185}}});
	level.bodies.push(testBody);

	//platform 2
	testBody  = Physics.bodies.getBox({height:30, width:300, static:true, collisionGroup:"ground", transform:{position:{x:800, y:300}}});
	level.bodies.push(testBody);

	testBody  = Physics.bodies.getBox({height:30, width:3000, static:true, collisionGroup:"ground", transform:{position:{x:30, y:400}}});
	level.bodies.push(testBody);

	var emitter = createEmitter(600,200);
	emitter.angle=-90;
	emitter.force = 5;

	var emitter = createEmitter(700,400);
	emitter.angle=-90;
	emitter.force = 20;

	var emitter = createEmitter(30,100);
	emitter.force = 10;
	emitter.angle = 20;
	emitter.radius = 20;


	var emitter = createEmitter(800,30);
	emitter.force = 10;
	emitter.angle = 20;
	emitter.radius = 20;


	function createEmitter(x, y)
	{
		var emitter = Emitter.create();
		emitter.setPosition(x, y);
		emitter.radius = 30;
		emitter.frequency = 100;
		emitter.gravity = {x:0, y:0.2};
		emitter.force=20;
		return emitter;
	}

	function draw(e)
	{
		for(var i in level.bodies)
		{
			var body = level.bodies[i];
			var ctx = Stage.superContext;
			//var ctx = Stage.context;
			ctx.beginPath();
			ctx.setFillStyle("rgb(60, 60, 60)");
			//ctx.fillStyle = "red";
			ctx.rect(body.transform.position.x,body.transform.position.y,body.getWidth(),body.getHeight());
			ctx.fill();

		}
	}

	return level;
}