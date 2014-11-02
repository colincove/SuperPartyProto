var Emitter = {};
Emitter.emitters = [];
Emitter.create = function()
{
	var emitter = {angle:0, force:10, frequency:50, x:0, y:0, radius:20, active:false, gravity:Physics.gravity};

	emitter.nodes = [];

	Emitter.emitters.push(emitter);

	setup();

	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, emitter.update);

	emitter.activeArea = Physics.bodies.getBox({height:1500, width:1500, isTrigger:true});
	emitter.activeArea.addEventListener(Physics.EVENT_ON_ENTER, emitter.onActiveEnter);
	emitter.activeArea.addEventListener(Physics.EVENT_ON_EXIT, emitter.onActiveExit);

	function setup()
	{
		emitter.setPosition = function(x, y)
		{
			emitter.x = x;
			emitter.y= y;

			emitter.activeArea.transform.setPosition(x-emitter.activeArea.getWidth()/2, y-emitter.activeArea.getHeight()/2);
		}
		emitter.setAngle = function(a)
		{
			this.angle = a;
		}

		emitter.setForce = function(f)
		{
			this.force = f;
		}

		emitter.stop = function()
		{
			clearInterval(emitter.timer);
			emitter.active = false;
		}

		emitter.start = function()
		{
			emitter.timer = setInterval(emitter.emit, emitter.frequency);
			emitter.active = true;
		}

		emitter.emit = function()
		{
			//var node = Physics.bodies.getCircle({radius:5, drag:1.15, height:10, width:10, isTrigger:true, transform:{position:{x:800, y:300}}});
			//var node = Physics.bodies.getBox({drag:1.15, height:10, width:10, isTrigger:true, transform:{position:{x:800, y:300}}});
			var node = Physics.bodies.getBox({drag:1.05, height:10, width:10, isTrigger:true, transform:{position:{x:800, y:300}}});



			node.addEventListener(Physics.EVENT_ON_ENTER, emitter.nodeCollide);
			node.transform.setPosition(emitter.x+(Math.random()*emitter.radius-Math.random()*emitter.radius), emitter.y+(Math.random()*emitter.radius-Math.random()*emitter.radius));
			node.transform.setVelocity(Math.cos(emitter.angle*(Math.PI/180))*emitter.force, Math.sin(emitter.angle*(Math.PI/180))*emitter.force);

			node.stationary = false;
			node.interval = 15;

			emitter.nodes.push(node);
		}

		emitter.update = function()
		{
			for(var i = 0; i < emitter.nodes.length; i++)
			{
				var node =  emitter.nodes[i];
				if(node.stationary)
				{
					if(node.interval-- <=0 )
					{
						Physics.bodies.destroyBody(node);
						emitter.nodes.splice(emitter.nodes.indexOf(node), 1);
						i--;
					}
				}
				else
				{
					node.transform.move(node.transform.velocity.x, node.transform.velocity.y);

					node.transform.setVelocity(
						node.transform.velocity.x/node.drag+
						emitter.gravity.x, 
						node.transform.velocity.y/node.drag+
						emitter.gravity.y);	
				}
			}
		}

		emitter.nodeCollide = function(e)
		{
			if(e.other.collisionGroup == "ground")
			{
				e.target.removeEventListener(Physics.EVENT_ON_ENTER, emitter.nodeCollide);
				e.target.stationary = true;
			}
		}

		emitter.onActiveEnter = function(e)
		{
			if(e.other.collisionGroup == "player")
			{
				emitter.start();
			}

		}

		emitter.onActiveExit = function(e)
		{
			if(e.other.collisionGroup == "player")
			{
				emitter.stop();
			}
		}


		emitter.destroy = function(e)
		{
			emitter.stop();
			Looper.removeEventListener(Looper.EVENT_LOGIC_TICK, this.update);
			emitter.activeArea.removeEventListener(Physics.EVENT_ON_ENTER, emitter.onActiveEnter);
			emitter.activeArea.removeEventListener(Physics.EVENT_ON_EXIT, emitter.onActiveExit);
			Emitter.emitters.splice(Emitter.emitters.indexOf(emitter), 1);
		}
	}
	

	return emitter;
}