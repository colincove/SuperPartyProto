var input;
var attachedTo;//body
var key = 32;
var projectile;//prefab name
var spawnX = 0;
var spawnY = 0;
var cooldown = 0;//milliseconds
var targetGroup;//string 
var lastShot = 0;
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
    bullet.body.transform.setPosition(gameObject.body.transform.position.x + spawnX * gameObject.dir, gameObject.body.transform.position.y + spawnY);
    if(bullet.dir == -1)
    {
        bullet.body.transform.setPosition(gameObject.body.transform.position.x + -20, gameObject.body.transform.position.y + spawnY);
    }
    if(gameObject.isCrouching)
    {
        bullet.body.transform.move(0, 40);
    }
    
}