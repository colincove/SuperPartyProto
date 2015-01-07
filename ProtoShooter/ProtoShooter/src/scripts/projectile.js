var speed = 5;

function update(e)
{
    gameObject.body.transform.setVelocity(speed * gameObject.dir, 0);
}
function CollisionOnEnter(e)
{
     gameObject.destroy();
}
function CollisionOnExit(e)
{
    
}