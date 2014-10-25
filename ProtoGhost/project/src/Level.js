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

	createEmitter(100,30);


	function createEmitter(x, y)
	{
		var emitter = Emitter.create();
		emitter.setPosition(x, y);
		emitter.radius = 30;
	}

	return level;
}