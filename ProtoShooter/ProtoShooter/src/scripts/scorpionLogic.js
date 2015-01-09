var interval = 0;
function update(e)
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
    }
}
function Setup()
{
    gameObject.frame = 1;
    gameObject.dir = 1;
    gameObject.flip = true;
}