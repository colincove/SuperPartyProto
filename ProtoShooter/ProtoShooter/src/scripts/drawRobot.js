var frame = 1;

var xOffset = -30;
var yOffset = -22;
var frameChange = 0;
var flipOffset = 0;

function draw(e)
{
    var tileSize = 128;
    var canvas 	= Stage.canvas;
    var context = Stage.superContext;
 
   if(gameObject.dir ==1)
   {
       flipOffset = 0;
   }
    else
    {
        flipOffset = tileSize;
    }
    
    if(gameObject.isFalling)
    {
        frame = 2;
    }
    else if(gameObject.isCrouching)
    {
        frame = 7;
    }else if(gameObject.isRunning)
    {
        if(++frameChange>5)
        {
            frameChange = 0;
            frame++;
        }
         if(frame<2 || frame >6)
        {
            frame = 3;
        }
    }else{
        frame = 1;
        }
    
    context.drawImage(R.drawable.heroSprite, (frame-1)*tileSize, flipOffset, tileSize, tileSize, gameObject.body.transform.position.x+xOffset, gameObject.transform.position.y+yOffset, tileSize, tileSize);
}
