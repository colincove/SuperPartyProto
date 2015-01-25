var gravity = 0;
function update(e)
{
    
}
function Setup(e)
{
    gravity = Physics.gravity.y;
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
        gravity = Physics.gravity.y;
        Physics.gravity.y = 1.5;
         SplashEffect.splash();
        SplashEffect.submerged = false;
    }
}
function CollisionOnExit(e)
{
   
    if(e.other.collisionGroup == "hero")
    {
        Physics.gravity.y = gravity;
        SplashEffect.submerged = true;
        SplashEffect.splash();
       hero.body.transform.setVelocity(0, 3);
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