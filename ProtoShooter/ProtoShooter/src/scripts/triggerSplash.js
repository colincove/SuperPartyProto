var gravity = 0;
var firstSplash = false;
function update(e)
{
    if(SplashEffect.submerged)
    {
        Physics.gravity.y = hero.carrying ? 1.5:gravity;
    }
    else
    {
        Physics.gravity.y = hero.carrying ? 3:1.5;
    }
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
    if(e.other.collisionGroup != "hero") return;
    if(!firstSplash)
    {
        firstSplash = true;
        return;
    }
     if(e.other.collisionGroup == "hero")
    {
         SplashEffect.splash();
        SplashEffect.submerged = false;
    }
}
function CollisionOnExit(e)
{
   
    if(e.other.collisionGroup == "hero")
    {
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