var Prefab = {};

Prefab.prefabs = {};

Prefab.instantiate = function(def)
{
    var gameObject = {};
   
    //------------------------------------------------------------------------------//
    //----------------------------Load scripts -------------------------------------//
    //------------------------------------------------------------------------------//
    
    gameObject.scripts  = {};
    var scripts         = def.scripts;
    
    for(var i in scripts)
    {
        gameObject.scripts[i] = Components.createScript(i, gameObject, scripts[i]);
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Load Body-----------------------------------------//
    //------------------------------------------------------------------------------//
    var bodyDef = def.body;
    
    if(bodyDef)
    {
        gameObject.body         = Physics.bodies.getBody(bodyDef.type, $.extend(bodyDef.config, {isTrigger:false}));
        gameObject.transform    = gameObject.body.transform;
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Load Triggers-------------------------------------//
    //------------------------------------------------------------------------------//
    var triggers        = def.triggers;
    gameObject.triggers = {};
    if(triggers)
    {
        for(var i in triggers)
        {
            var trigger = triggers[i];
            gameObject.triggers[i] = Physics.bodies.getBody(bodyDef.type, $.extend(trigger.config, {isTrigger:true}));
        }
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Load Mappings-------------------------------------//
    //------------------------------------------------------------------------------//
        
    for(var i in def.mappings)
    {
        var path = i.split(".");
        gameObject.scripts[path[0]].map(path[path.length-1], eval("gameObject."+def.mappings[i]));
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Messaging-----------------------------------------//
    //------------------------------------------------------------------------------//
    
    gameObject.message = function(msg, data)
    {
        for(var i in gameObject.scripts)
        {
            gameObject.scripts[i].message(msg, data);
        }
    }
        
    //----------------------------Setup Complete------------------------------------//
    gameObject.message("Setup", {});
    
    //------------------------------------------------------------------------------//
    //----------------------------Events--------------------------------------------//
    //------------------------------------------------------------------------------//
    
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
    
    function update(e)
    {
         gameObject.message("update", e);
    }
    
    Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    
    function draw(e)
    {
        for( var i in def.renderers)
        {
            renderers[i].message
        }
         gameObject.message("draw", e);
    }
    if(gameObject.body)
    {
        gameObject.body.addEventListener(Physics.EVENT_ON_ENTER, onCollide);
        gameObject.body.addEventListener(Physics.EVENT_ON_EXIT, onExit);
    }
    
    gameObject.destroy = function()
    {
        if(gameObject.body)
        {
            gameObject.body.removeEventListener(Physics.EVENT_ON_ENTER, onCollide);
            gameObject.body.removeEventListener(Physics.EVENT_ON_EXIT, onExit);
            Physics.bodies.destroyBody(gameObject.body);
        }
        Looper.removeEventListener(Looper.EVENT_LOGIC_TICK, update);
        Looper.removeEventListener(Looper.EVENT_DRAW_TICK, draw);
        
        for(var i in gameObject.triggers)
        {
             Physics.bodies.destroyBody(gameObject.triggers[i]);
        }
        
        gameObject.message("destroy", {});
    }
    function onCollide(e)
    {
        gameObject.message("CollisionOnEnter", {});
    }
    function onExit(e)
    {
        gameObject.message("CollisionOnExit", {});
    }
    
    if(gameObject.body) gameObject.body.gameObject = gameObject;
    
    return gameObject;
}
Prefab.load = function(urls, callback)
{
    FileLoader.readFile(urls, fileLoaded, callback);
    function fileLoaded(url, data)
    {
        Prefab.prefabs[url.substring(url.lastIndexOf('/')+1).split('.')[0]] = eval("("+data+")");
    }
}