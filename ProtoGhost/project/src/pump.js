var Pump = {};

Pump.create = function (player)
{
	var pump = {player:player};
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
		/*for(var i in Emitter.emitters)
		{
			var emitter = Emitter.emitter[i];
			if(emitter.active)
			{
				for(var j in emitter.nodes)
				{
					
				}
			}
		}*/
	}
	function doSuck()
	{

	}
	return pump;
}