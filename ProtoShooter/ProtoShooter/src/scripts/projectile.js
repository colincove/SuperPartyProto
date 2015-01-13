var speed = 5;
var strength = 1;
function update(e)
{
    gameObject.body.transform.setVelocity(speed * gameObject.dir, 0);
}
function CollisionOnEnter(e)
{
    if(e.other.collisionGroup == gameObject.targetGroup)
    {
      e.other.gameObject.message("doDamage", {strength:strength});
    }
     gameObject.destroy();
}
function CollisionOnExit(e)
{
    
}