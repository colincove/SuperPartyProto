function createSamusCamera(heroPrefab)
{
    var cam = {hero:heroPrefab};
    
    var offset = {x:0, y:0};
    
    var maxOffset = 100;
     var maxYOffset = 100;
    var offsetVelocity = 5;
    var offsetYVelocity = 2;
    var camOffset = {x:30, y:20};
    
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
    
    function update(e)
    {
        if(cam.hero.body.transform.velocity.x > 1)
        {
            offset.x+=offsetVelocity;
        }else if(cam.hero.body.transform.velocity.x < -1)
        {
            offset.x-=offsetVelocity;
        }
         if(cam.hero.body.transform.velocity.y > 1)
        {
            offset.y+=cam.hero.body.transform.velocity.y/offsetYVelocity;
        }else if(cam.hero.body.transform.velocity.y < -1)
        {
            offset.y+=cam.hero.body.transform.velocity.y/offsetYVelocity;
        }
        if(offset.x > maxOffset)
        {
            offset.x = maxOffset;
        }else if(offset.x < -maxOffset)
        {
            offset.x = -maxOffset;
        }
        if(offset.y > maxYOffset)
        {
            offset.y = maxYOffset;
        }else if(offset.y < -maxYOffset)
        {
            offset.y = -maxYOffset;
        }
        Stage.cam.x += (((hero.body.transform.position.x+camOffset.x + offset.x)-Stage.canvas.width/2)-Stage.cam.x)/2;
        Stage.cam.y += (((hero.body.transform.position.y+camOffset.y + offset.y)-Stage.canvas.height/2)-Stage.cam.y)/2;
       // Stage.cam.x = (hero.body.transform.position.x+camOffset.x + offset.x)-Stage.canvas.width/2;
        //Stage.cam.y = (hero.body.transform.position.y+camOffset.y + offset.y)-Stage.canvas.height/2;
        
    }
    
    return cam;
}