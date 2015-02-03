SuperParty.onSetupComplete = doSetup;
SuperParty.projectName = "ProtoShooter";

var hero;

var levelTileSize = 56;
var splashStarted = false;
var loadingScreen;
var loadingSpan;
var camOffset = {x:30, y:20};

function doSetup()
{
    loadingScreen = $("<div></div>");
    loadingSpan = $("<span></span>");
    loadingSpan.html("Loading");
    loadingScreen.addClass("loading-screen");
    loadingScreen.append(loadingSpan);
    $("#game").append(loadingScreen);
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
    
    Resources.addAudio('ambience_cave', 'ProtoShooter/res/sound/Ambience_Cave.wav');
    Resources.addAudio('ambience_under_water', 'ProtoShooter/res/sound/Ambience_Underwater.wav');
    
    Resources.addAudio('foot_stop_underwater_01', 'ProtoShooter/res/sound/Character_Footsteps_Underwater_01.wav');
    Resources.addAudio('foot_stop_underwater_02', 'ProtoShooter/res/sound/Character_Footsteps_Underwater_02.wav');
    Resources.addAudio('foot_stop_underwater_03', 'ProtoShooter/res/sound/Character_Footsteps_Underwater_03.wav');
    Resources.addAudio('foot_stop_underwater_04', 'ProtoShooter/res/sound/Character_Footsteps_Underwater_04.wav');
    Resources.addAudio('foot_stop_01', 'ProtoShooter/res/sound/Character_Footsteps_01.wav');
    Resources.addAudio('foot_stop_02', 'ProtoShooter/res/sound/Character_Footsteps_02.wav');
    Resources.addAudio('foot_stop_03', 'ProtoShooter/res/sound/Character_Footsteps_03.wav');
    Resources.addAudio('foot_stop_04', 'ProtoShooter/res/sound/Character_Footsteps_04.wav');
    
    Resources.addAudio('heat_vent', 'ProtoShooter/res/sound/Heat_Vent.wav');
    
    Resources.addAudio('laser_gun_underwater_01', 'ProtoShooter/res/sound/Laser_Gun_Underwater_01.wav');
    Resources.addAudio('laser_gun_underwater_02', 'ProtoShooter/res/sound/Laser_Gun_Underwater_02.wav');
    Resources.addAudio('laser_gun_underwater_03', 'ProtoShooter/res/sound/Laser_Gun_Underwater_03.wav');
    Resources.addAudio('laser_gun_01', 'ProtoShooter/res/sound/Laser_Gun_01.wav');
    Resources.addAudio('laser_gun_02', 'ProtoShooter/res/sound/Laser_Gun_02.wav');
    Resources.addAudio('laser_gun_03', 'ProtoShooter/res/sound/Laser_Gun_03.wav');
    
Resources.addAudio('scorpion_hit_underwater_01', 'ProtoShooter/res/sound/Scorpion_Being_Hit_Underwater_01.wav');
    Resources.addAudio('scorpion_hit_underwater_02', 'ProtoShooter/res/sound/Scorpion_Being_Hit_Underwater_02.wav');
    Resources.addAudio('scorpion_hit_underwater_03', 'ProtoShooter/res/sound/Scorpion_Being_Hit_Underwater_03.wav');
    Resources.addAudio('scorpion_hit_underwater_04', 'ProtoShooter/res/sound/Scorpion_Being_Hit_Underwater_04.wav');
    Resources.addAudio('scorpion_hit_01', 'ProtoShooter/res/sound/Scorpion_Being_Hit_01.wav');
    Resources.addAudio('scorpion_hit_02', 'ProtoShooter/res/sound/Scorpion_Being_Hit_02.wav');
    Resources.addAudio('scorpion_hit_03', 'ProtoShooter/res/sound/Scorpion_Being_Hit_03.wav');
    Resources.addAudio('scorpion_hit_04', 'ProtoShooter/res/sound/Scorpion_Being_Hit_04.wav');
    
     Resources.addAudio('scorpion_die_underwater_01', 'ProtoShooter/res/sound/Scorpion_Die_Underwater_01.wav');
     Resources.addAudio('scorpion_die_underwater_02', 'ProtoShooter/res/sound/Scorpion_Die_Underwater_02.wav');
     Resources.addAudio('scorpion_die_underwater_03', 'ProtoShooter/res/sound/Scorpion_Die_Underwater_03.wav');
     Resources.addAudio('scorpion_die_underwater_04', 'ProtoShooter/res/sound/Scorpion_Die_Underwater_04.wav');
     Resources.addAudio('scorpion_die_01', 'ProtoShooter/res/sound/Scorpion_Dying_01.wav');
     Resources.addAudio('scorpion_die_02', 'ProtoShooter/res/sound/Scorpion_Dying_02.wav');
     Resources.addAudio('scorpion_die_03', 'ProtoShooter/res/sound/Scorpion_Dying_03.wav');
     Resources.addAudio('scorpion_die_04', 'ProtoShooter/res/sound/Scorpion_Dying_04.wav');
    
    Resources.addAudio('scorpion_attack_underwater_01', 'ProtoShooter/res/sound/Scorpion_Attack_Underwater_01.wav');
Resources.addAudio('scorpion_attack_underwater_02', 'ProtoShooter/res/sound/Scorpion_Attack_Underwater_02.wav');
Resources.addAudio('scorpion_attack_underwater_03', 'ProtoShooter/res/sound/Scorpion_Attack_Underwater_03.wav');
Resources.addAudio('scorpion_attack_underwater_04', 'ProtoShooter/res/sound/Scorpion_Attack_Underwater_04.wav');
    Resources.addAudio('scorpion_attack_01', 'ProtoShooter/res/sound/Scorpion_Attack_01.wav');
Resources.addAudio('scorpion_attack_02', 'ProtoShooter/res/sound/Scorpion_Attack_02.wav');
Resources.addAudio('scorpion_attack_03', 'ProtoShooter/res/sound/Scorpion_Attack_03.wav');
Resources.addAudio('scorpion_attack_04', 'ProtoShooter/res/sound/Scorpion_Attack_04.wav');
    
    Resources.addAudio('water_entry', 'ProtoShooter/res/sound/Water_Entry.wav');
    
	Resources.startLoad();
}
function startGame(e)
{    
   loadingScreen.hide();
    
	var canvas 	= Stage.canvas;
    var context = Stage.superContext;
    
    canvas.width = 600;
    canvas.height = 350;
    
    Physics.gravity.y = 0.8;
    
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
                        case 'R':
                                var civilian = Prefab.instantiate(Prefab.prefabs['civilian']);
                                civilian.body.transform.setPosition(j*levelTileSize, i*levelTileSize - 30);
                                break;
                    }
                }
            }
         Looper.addEventListener(Looper.EVENT_DRAW_TICK, drawHurt);
    }
     var elevator = Prefab.instantiate(Prefab.prefabs['elevator']);
    elevator.body.transform.setPosition(30 * levelTileSize, 3*levelTileSize - elevator.body.getHeight());
    var caverns = Prefab.instantiate(Prefab.prefabs['caverns']);
    //var testObj = Prefab.instantiate(Prefab.prefabs['testPrefab']);
    hero = Prefab.instantiate(Prefab.prefabs['hero']); 
    
    
    hero.body.transform.setPosition(0, -1000);
    
    Stage.cam.x = (hero.body.transform.position.x+camOffset.x)-Stage.canvas.width/2;
    Stage.cam.y = (hero.body.transform.position.y+camOffset.y)-Stage.canvas.height/2;
    
    
    SplashEffect.start();
    createSamusCamera(hero);
    
    R.audio.ambience_cave.play();
    R.audio.ambience_cave.loop = true;
    R.audio.ambience_under_water.loop = true;
   
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