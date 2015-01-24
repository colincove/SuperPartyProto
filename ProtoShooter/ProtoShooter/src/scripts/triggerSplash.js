function update(e)
{
    
}
function Setup(e)
{
    for(var i in gameObject.triggers)
    {
        
       gameObject.triggers[i].addEventListener(Physics.EVENT_ON_ENTER, CollisionOnEnter);
        gameObject.triggers[i].addEventListener(Physics.EVENT_ON_EXIT, CollisionOnExit);
    }
}
function CollisionOnEnter(e)
{
    if(e.other.collisionGroup == "hero")
    {
        SplashEffect.splash();
        hero.body.transform.setVelocity(0, -3);
    }
}
function CollisionOnExit(e)
{
    if(e.other.collisionGroup == "hero")
    {
        SplashEffect.submerged = false;
    }
}
function destroy(e)
{
    for(var i in gameObject.triggers)
    {
        gameObject.triggers[i].removeEventListener(Physics.EVENT_ON_ENTER, CollisionOnEnter);
        gameObject.triggers[i].removeEventListener(Physics.EVENT_ON_EXIT, CollisionOnExit);
    }
}