var interval = 0;
var active = false;
var agroTrigger;
function update(e)
{
    if(active)
    {
        interval++;
    
        if(interval == 20)
        {
            gameObject.dir = gameObject.flip ? 1:-1;
            gameObject.message("shoot", {});
            gameObject.frame = 2;
        }
        if(interval > 40)
        {
            gameObject.frame = 1;
            interval = 0;
            var vd = gameObject.body.transform.position.x - hero.body.transform.position.x;

            gameObject.flip = vd > 0 ? false:true;
        }
    }
}
function Setup()
{
    gameObject.frame = 1;
    gameObject.dir = 1;
    gameObject.flip = true;
    
    agroTrigger.addEventListener(Physics.EVENT_ON_ENTER, agroEnter);
    agroTrigger.addEventListener(Physics.EVENT_ON_EXIT, agroExit);
}
function agroEnter(e)
{
    if(e.other.collisionGroup == "hero")
    {
        active = true;
    }
}
function agroExit(e)
{
    if(e.other.collisionGroup == "hero")
    {
        active = false;
    }
}