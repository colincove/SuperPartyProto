var Pump = {};

Pump.create = function (player)
{
	var pump = {player:player};
	pump.maxForce = 1;
	pump.dist = 200;
	pump.radius = 20;
	pump.totalRatio = 0.3;
	pump.chunkA = 0.5 / pump.totalRatio;
	pump.chunkB = 1-pump.chunkA;
	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, onUpdate);
	function onUpdate(e)
	{
		if(player.suck)
		{
			doSuck();
		}
		if(player.blow)
		{
			doBlow();
		}
	}
	function doBlow()
	{
		for(var i in Emitter.emitters)
		{
			var emitter = Emitter.emitters[i];
			if(emitter.active)
			{
				for(var j in emitter.nodes)
				{
					var node = emitter.nodes[j];
					var dist = node.transform.position.x - pump.player.body.transform.position.x;
					var rDist = node.transform.position.y - pump.player.body.transform.position.y;

					if(Math.abs(rDist) > pump.radius) continue;//not in range
					if(Math.abs(dist) > pump.dist) continue;//not in range
					if(pump.player.dir == -1 && dist > 0 ) continue;//not facing right direction
					if(pump.player.dir == 1 && dist < 0 ) continue;//not facing right direction

					var xRatio = Math.abs(dist/pump.dist);
					var yRatio = Math.abs(rDist/pump.radius);
					
					var totalRatio = (xRatio + yRatio * pump.totalRatio)/(1 + 1 * pump.totalRatio);

					var power = pump.maxForce * totalRatio;

					emitter.nodes[j].transform.setVelocity(
						emitter.nodes[j].transform.velocity.x + power * player.dir, 
						emitter.nodes[j].transform.velocity.y
						);
				}
			}
		}
	}
	function doSuck()
	{
		for(var i in Emitter.emitters)
		{
			var emitter = Emitter.emitters[i];
			if(emitter.active)
			{
				for(var j in emitter.nodes)
				{
					var node = emitter.nodes[j];
					var dist = node.transform.position.x - pump.player.body.transform.position.x;
					var rDist = node.transform.position.y - pump.player.body.transform.position.y;

					if(Math.abs(rDist) > pump.radius) continue;//not in range
					if(Math.abs(dist) > pump.dist) continue;//not in range
					if(pump.player.dir == -1 && dist > 0 ) continue;//not facing right direction
					if(pump.player.dir == 1 && dist < 0 ) continue;//not facing right direction

					var xRatio = Math.abs(dist/pump.dist);
					var yRatio = Math.abs(rDist/pump.radius);
					

					var power = pump.maxForce * xRatio;

					emitter.nodes[j].transform.setVelocity(
						emitter.nodes[j].transform.velocity.x + power * player.dir * -1, 
						emitter.nodes[j].transform.velocity.y
						);
				}
			}
		}
	}
	return pump;
}