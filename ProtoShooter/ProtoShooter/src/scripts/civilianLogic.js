var areaTrigger;
var input;
function Setup(e)
{
    gameObject.heroTouch = false;
    gameObject.carry = false;
    
    input = Input.getKeyInput();
     input.addEventListener(Input.EVENT_KEY_DOWN, onKeyDown);
    
    areaTrigger.addEventListener(Physics.EVENT_ON_ENTER, onCollideEnter);
       areaTrigger.addEventListener(Physics.EVENT_ON_EXIT, onCollideExit);
}
function onCollideEnter(e)
{
    if(e.other.collisionGroup == "hero")
    {
        gameObject.heroTouch = true;
    }
}
function onCollideExit(e)
{
      if(e.other.collisionGroup == "hero")
    {
        gameObject.heroTouch = false;
    }
}
function destroy(e)
{
     input.removeEventListener(Input.EVENT_KEY_DOWN, onKeyDown);
    areaTrigger.removeEventListener(Physics.EVENT_ON_ENTER, onCollideEnter);
       areaTrigger.removeEventListener(Physics.EVENT_ON_EXIT, onCollideExit);
}
function onKeyDown(e)
{
    if(e.keyCode == 83 && gameObject.heroTouch && !hero.carrying )
    {
        gameObject.carry = true;
        gameObject.body.isTrigger = true;
        hero.carrying = gameObject;
    } else if(e.keyCode == 83 && gameObject.heroTouch && hero.carrying == gameObject )
    {
        
        gameObject.carry = false;
        gameObject.body.isTrigger = false;
        hero.carrying = null;
    }
}
function update(e)
{
    if(gameObject.carry)
    {
        gameObject.body.transform.setPosition(
            hero.body.transform.position.x + (hero.dir == 1 ? (gameObject.body.getWidth() * -1):hero.body.getWidth()), 
            hero.body.transform.position.y + 60);
    }
}