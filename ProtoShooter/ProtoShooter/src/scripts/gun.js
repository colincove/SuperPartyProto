var input;
var attachedTo;//body
var key = 32;
var projectile;//prefab name
var spawnX = 0;
var spawnY = 0;
var cooldown = 0;//milliseconds
var targetGroup;//string 
var lastShot = 0;
var soundType; //heroLaser, heroMissile, enemy
var gunOffsetX = 0, gunOffsetY = 0;
function Setup()
{
    input = Input.getKeyInput();
    input.addEventListener(Input.EVENT_KEY_DOWN, onKeyDown);
}
function onKeyDown(e)
{
    if(e.keyCode == key &&  (new Date).getTime() - lastShot > cooldown)
    {
        shoot();
        lastShot =  (new Date).getTime();
    }
}
function shoot()
{
    var bullet = Prefab.instantiate(Prefab.prefabs[projectile]);
    bullet.dir = gameObject.dir;
    bullet.targetGroup = targetGroup;
    bullet.body.transform.setPosition(gameObject.body.transform.position.x + ((spawnX + gunOffsetX) * gameObject.dir), gameObject.body.transform.position.y + spawnY + gunOffsetY);
    if(bullet.dir == -1)
    {
        bullet.body.transform.setPosition(gameObject.body.transform.position.x + -20, gameObject.body.transform.position.y + spawnY + gunOffsetY);
    }
    if(gameObject.isCrouching)
    {
        bullet.body.transform.move(0, 40);
    }
    if(soundType == "heroLaser")
    {
        var random = Math.round(Math.random()*3);

        if(random == 0)
        {
            R.audio.laser_gun_underwater_01.play();
        }
        else if(random == 1)
        {
             R.audio.laser_gun_underwater_02.play();
        }
        else if(random == 2)
        {
             R.audio.laser_gun_underwater_03.play();
        }
    
    }
   
    
    
}
function SetGunOffset(data)
{
    gunOffsetX = data.x;
    gunOffsetY = data.y;
}