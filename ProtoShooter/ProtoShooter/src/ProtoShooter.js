SuperParty.onSetupComplete = doSetup;
SuperParty.projectName = "ProtoShooter";

var hero;

var levelTileSize = 56;
var splashStarted = false;

var camOffset = {x:30, y:20};

function doSetup()
{
	SuperParty.loadScripts(init, ['ProtoShooter/src/DemoLevel.js', 'ProtoShooter/src/splashEffect.js', 'ProtoShooter/src/samusCamera.js']);
}
function init()
{
	Resources.addEventListener(Resources.EVENT_ON_COMPELETE, startGame);
	
	Resources.addImage('testImage', 'ProtoShooter/res/3268850-master+chief+epicness.jpg');
	Resources.addImage('monster', 'ProtoShooter/res/microbe.png');
    Resources.addImage('basicTile', 'ProtoShooter/res/basic-tile.png');
    Resources.addImage('heroSprite', 'ProtoShooter/res/robot-sprite.png');
    Resources.addImage('samusProjectile', 'ProtoShooter/res/samus-projectile.png');
    Resources.addImage('clamSprite', 'ProtoShooter/res/clam-sprite.png');
    Resources.addImage('scorpionSprite', 'ProtoShooter/res/scorpion-sprite.png');
    
	Resources.startLoad();
}
function startGame(e)
{    
	var canvas 	= Stage.canvas;
    var context = Stage.superContext;
    
    canvas.width = 600;
    canvas.height = 350;
    
    Physics.gravity.y = 0.55;
    
    var level;
    var levelRows;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
    
    FileLoader.readFile("ProtoShooter/res/levelDef.txt", levelLoaded);
	
	//Physics.startDebugDraw();
    
    
	
	function draw()
    {
		//reset canvas
		   Stage.context.rect(0,0,canvas.width,canvas.height);
		 Stage.context.fillStyle = "black";
		Stage.context.fill();
        
        if(levelRows)
        {
       
        
            for(var i =0; i<levelRows.length; i++)
            {
                var row = levelRows[i];
                for(var j =0; j<row.length; j++)
                {
                    var char = row.charAt(j);
                    switch(char)
                    {
                            case 'A':
                                context.drawImage(R.drawable.basicTile, 0, 0, levelTileSize, levelTileSize, j*levelTileSize, i*levelTileSize, levelTileSize, levelTileSize);
                            break;
                             case 'B':
                                context.drawImage(R.drawable.basicTile, levelTileSize, 0, levelTileSize, levelTileSize, j*levelTileSize, i*levelTileSize, levelTileSize, levelTileSize);
                            break;
                             case 'C':
                                context.drawImage(R.drawable.basicTile, levelTileSize*2, 0, levelTileSize, levelTileSize, j*levelTileSize, i*levelTileSize, levelTileSize, levelTileSize);
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
            
            //hero.body.transform.setVelocity(0, -3);
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
                                Physics.bodies.getBox({collisionGroup:"ground", height:levelTileSize, width:levelTileSize, static:true, transform:{position:{x:j*levelTileSize, y:i*levelTileSize}}, fric:1.1});
                               // context.drawImage(R.drawable.basicTile, 0, 0, levelTileSize, levelTileSize, j*levelTileSize, i*levelTileSize, levelTileSize, levelTileSize);
                                break;
                            case 'X':
                                var enemy = Prefab.instantiate(Prefab.prefabs['scorpion']);
                                enemy.body.transform.setPosition(j*levelTileSize, i*levelTileSize - 30);
                                break;
                    }
                }
            }
         Looper.addEventListener(Looper.EVENT_DRAW_TICK, drawHurt);
    }
    var caverns = Prefab.instantiate(Prefab.prefabs['caverns']);
    //var testObj = Prefab.instantiate(Prefab.prefabs['testPrefab']);
    hero = Prefab.instantiate(Prefab.prefabs['hero']); 
    
    
    hero.body.transform.setPosition(0, -300);
    
    Stage.cam.x = (hero.body.transform.position.x+camOffset.x)-Stage.canvas.width/2;
    Stage.cam.y = (hero.body.transform.position.y+camOffset.y)-Stage.canvas.height/2;
    
    
    SplashEffect.start();
    createSamusCamera(hero);
   
}
function drawHurt(e)
{
    var canvas 	= Stage.canvas;
    var context = Stage.superContext;
    if(hero.hurt)
    {
        Stage.context.rect(0,0,canvas.width,canvas.height);
		 Stage.context.fillStyle = 'rgba(193, 0, 0, 100)';
		Stage.context.fill();
        hero.hurt = false;
    }
}