SuperParty.onSetupComplete = doSetup;
SuperParty.projectName = "ProtoShooter";

var tileSize = 56;
var splashStarted = false;

var camOffset = {x:30, y:20};

function doSetup()
{
	SuperParty.loadScripts(init, ['ProtoShooter/src/DemoLevel.js', 'ProtoShooter/src/splashEffect.js']);
}
function init()
{
	Resources.addEventListener(Resources.EVENT_ON_COMPELETE, startGame);
	
	Resources.addImage('testImage', 'ProtoShooter/res/3268850-master+chief+epicness.jpg');
	Resources.addImage('monster', 'ProtoShooter/res/microbe.png');
    Resources.addImage('basicTile', 'ProtoShooter/res/basic-tile.png');
    Resources.addImage('heroSprite', 'ProtoShooter/res/robot-sprite.png');
    Resources.addImage('samusProjectile', 'ProtoShooter/res/samus-projectile.png');
	
	Resources.startLoad();
}
function startGame(e)
{    
	var canvas 	= Stage.canvas;
    var context = Stage.superContext;
    
    canvas.width = 600;
    canvas.height = 350;
    
    FileLoader.readFile("ProtoShooter/res/levelDef.txt", levelLoaded);
    
    var level;
    var levelRows;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	//Physics.startDebugDraw();
	
	function draw()
    {
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle="black";
		context.fill();
        
        if(levelRows)
        {
       
        
            for(var i in levelRows)
            {
                var row = levelRows[i];
                for(var j =0; j<row.length; j++)
                {
                    var char = row.charAt(j);
                    switch(char)
                    {
                            case 'A':
                                context.drawImage(R.drawable.basicTile, 0, 0, tileSize, tileSize, j*tileSize, i*tileSize, tileSize, tileSize);
                            break;
                             case 'B':
                                context.drawImage(R.drawable.basicTile, tileSize, 0, tileSize, tileSize, j*tileSize, i*tileSize, tileSize, tileSize);
                            break;
                             case 'C':
                                context.drawImage(R.drawable.basicTile, tileSize*2, 0, tileSize, tileSize, j*tileSize, i*tileSize, tileSize, tileSize);
                            break;
                    }
                }
            }
        }
    }
    
    function update()
    {
        //DO this in a proper script
        Stage.cam.x += (((hero.body.transform.position.x+camOffset.x)-Stage.canvas.width/2)-Stage.cam.x)/5;
        Stage.cam.y += (((hero.body.transform.position.y+camOffset.y)-Stage.canvas.height/2)-Stage.cam.y)/5;
		
		if(hero.body.transform.position.y > 0 && !splashStarted)
        {
            splashStarted = true;
            SplashEffect.start();
            hero.body.transform.setVelocity(0, -3);
            //hero.body.transform.velocity.y = hero.body.transform.velocity.y*0.0;
        }
    }
    function levelLoaded(url, data)
    {
        level = data;
        levelRows = data.split("\n");//splt text file from lines into an array;
        
        
            for(var i in levelRows)
            {
                var row = levelRows[i];
                for(var j =0; j<row.length; j++)
                {
                    var char = row.charAt(j);
                    switch(char)
                    {
                            case 'A':
                                Physics.bodies.getBox({collisionGroup:"ground", height:tileSize, width:tileSize, static:true, transform:{position:{x:j*tileSize, y:i*tileSize}}});
                               // context.drawImage(R.drawable.basicTile, 0, 0, tileSize, tileSize, j*tileSize, i*tileSize, tileSize, tileSize);
                    }
                }
            }
    }
    //var testObj = Prefab.instantiate(Prefab.prefabs['testPrefab']);
    var hero = Prefab.instantiate(Prefab.prefabs['hero']); 
    
    
    hero.body.transform.setPosition(0, -300);
    
     Stage.cam.x = (hero.body.transform.position.x+camOffset.x)-Stage.canvas.width/2;
        Stage.cam.y = (hero.body.transform.position.y+camOffset.y)-Stage.canvas.height/2;
}