var Physics 			= {};

//-------------------------
//Enums
//-------------------------
var BodyTypes 			= new Enum('CIRCLE', 'BOX', 'POLYGON', 'POINT');



Physics.bodies 			= {};
Physics.bodies.lists 	= {allBodies:[]};
Physics.solver 			= {solve:function(body1, body2){}};
Physics.doCollisions 	= function(){};

setupPhysicsMethods(Physics);
//-------------------------
//Events
//-------------------------
Physics.EVENT_ON_LOITER = "EVENT_ON_LOITER";//when a physics body loiters within a trigger
Physics.EVENT_ON_ENTER 	= "EVENT_ON_ENTER";//when a physics body enters a trigger
Physics.EVENT_ON_EXIT 	= "EVENT_ON_EXIT";//when a physics body exits a trigger
Physics.EVENT_COLLIDE 	= "EVENT_COLLIDE";//when 2 physics bodies collide



//-------------------------
//Setup
//-------------------------
function setupPhysicsMethods(Physics)
{
	Physics.onCollision = function(body1, body2, type)
	{
		if(body1.isTrigger || body2.isTrigger) 
		{
			var body 	= body1.isTrigger ? body2:body1;
			var trigger = body1.isTrigger ? body1:body2;

			if(trigger.collisionTable[body.UUID])
			{
				trigger.emitEvent(Physics.EVENT_ON_LOITER, {other:body});
			}
			else
			{
				trigger.emitEvent(Physics.EVENT_ON_ENTER, {other:body});
				trigger.collisionTable[body.UUID] = body;
				trigger.activeCollisions = trigger.activeCollisions + 1;
			}
		}
		else
		{
			//2 physical bodies have collided. Resolve the collision in the physics world. 
			Physics.solver.solve(body1, body2, type);
		}
	}
	//Collision engine calls this when 2 bodies are NOT touching.
	Physics.collisionCleanup = function(body1, body2)
	{
		if(body1.isTrigger || body2.isTrigger) 
		{
			var body 	= body1.isTrigger ? body2:body1;
			var trigger = body1.isTrigger ? body1:body2;

			if(trigger.collisionTable[body.UUID])
			{
				trigger.emitEvent(Physics.EVENT_ON_EXIT, {other:body});
				trigger.collisionTable[body.UUID] = undefined;
				trigger.activeCollisions = trigger.activeCollisions - 1;
			}
		}
	}
	//instantiate lists used to keep track of bodies
	for(var i = 0; i < BodyTypes.size; i++)
	{
		Physics.bodies.lists[i] = [];
	}
	Physics.bodies.destroyBody = function(body)
	{
		var list = Physics.bodies.lists[body.type];
		removeFromList(list, body);
		removeFromList(Physics.bodies.lists.allBodies, body);
	}
	Physics.bodies.addBody = function(body)
	{
		var list = Physics.bodies.lists[body.type];
		list.push(body);
		Physics.bodies.lists.allBodies.push(body);
	}
	Physics.bodies.setupBody = function(body)
	{
		this.addBody(body);
		Events.setup(body);
	}
	Physics.bodies.config = 
		{
			collisionTable:{},
			type:BodyTypes.POINT,
			sleeping:false,
			isTrigger:false,
			activeCollisions:0,
			static:false,
			drag:1,
			damp:1,
			mass:1,
			density:1, 
			owner:{},
			collisionGroup:'common',
			getWidth:function(){return 0;},
			getHeight:function(){return 0;},
			transform:
			{
				position:{x:0, y:0}, 
				velocity: {x:0, y:0}, 
				rotation: 0, 
				scale:1,
				applyForce:function(x, y)
				{
					this.velocity.x+=	x;
					this.velocity.y+=	y;
				},
				setVelocity:function(x, y)
				{
					this.velocity.x = x;
					this.velocity.y = y;
				},
				setPosition:function(x, y) 
				{
					this.position.x = x;
					this.position.y = y;
				}
			}
		};
	Physics.bodies.circleConfig = $.extend( true, Physics.bodies.config,
		{
			type:BodyTypes.CIRCLE, 
			radius:1
		} );
	Physics.bodies.boxConfig = $.extend( true, Physics.bodies.config, 
		{
			type:BodyTypes.BOX, 
			width:1, 
			height:1
		} );
	Physics.bodies.polygonConfig = $.extend( true, Physics.bodies.config, 
		{
			type:BodyTypes.POLYGON, 
			vertices:[],
			getVertexCount:function(){return this.vertices.length;}
		} );
	Physics.bodies.getPoint = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.config, config, {UUID:UUID.create()} );
		this.setupBody(body);
		return body;
	}
	Physics.bodies.getCircle = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.circleConfig, config, {UUID:UUID.create()} );
		this.setupBody(body);
		body.getWidth = function()
		{
			return this.transform.scale*this.radius*2;
		}
		body.getHeight = function()
		{
			return this.transform.scale*this.radius*2;
		}
		return body;
	}
	Physics.bodies.getBox = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.boxConfig, config, {UUID:UUID.create()} );
		this.setupBody(body);
		body.getWidth = function()
		{
			return this.scale*this.width;
		}
		body.getHeight = function()
		{
			return this.scale*this.height;
		}
		return body;
	}
	Physics.bodies.getPolygon = function(config)
	{
		var body = $.extend( true, {}, Physics.bodies.polygonConfig, config, {UUID:UUID.create()} );
		this.setupBody(body);
		return body;
	}
}
