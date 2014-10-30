function setupLevel()
{
	var level = {};


	var testBody  = Physics.bodies.getBox({height:30, width:500, static:true, collisionGroup:"ground", transform:{position:{x:30, y:300}}});


	level.testBody = testBody;

	//platform 1
	testBody  = Physics.bodies.getBox({height:30, width:100, static:true, collisionGroup:"ground", transform:{position:{x:300, y:185}}});

	//platform 2
	testBody  = Physics.bodies.getBox({height:30, width:300, static:true, collisionGroup:"ground", transform:{position:{x:800, y:300}}});

	testBody  = Physics.bodies.getBox({height:30, width:3000, static:true, collisionGroup:"ground", transform:{position:{x:30, y:400}}});

	var emitter = createEmitter(600,200);
	emitter.angle=-90;
	emitter.force = 5;

	var emitter = createEmitter(30,100);
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

	return level;
}