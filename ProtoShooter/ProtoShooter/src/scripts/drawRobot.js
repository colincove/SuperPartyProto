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
    var crouchOffset = gameObject.isCrouching ? -40:0;
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
            if(frame == 4 || frame == 6)
            {
                 var random = Math.round(Math.random()*4);

                if(random == 0)
                {
                     R.audio.foot_stop_underwater_01.pause();
                    R.audio.foot_stop_underwater_01.currentTime = 0;
                    R.audio.foot_stop_underwater_01.play();
                }
                else if(random == 1)
                {
                    R.audio.foot_stop_underwater_02.pause();
                    R.audio.foot_stop_underwater_02.currentTime = 0;
                     R.audio.foot_stop_underwater_02.play();
                }
                else if(random == 2)
                {
                     R.audio.foot_stop_underwater_03.pause();
                    R.audio.foot_stop_underwater_03.currentTime = 0;
                     R.audio.foot_stop_underwater_03.play();
                }
                else if(random == 3)
                {
                     R.audio.foot_stop_underwater_04.pause();
                    R.audio.foot_stop_underwater_04.currentTime = 0;
                     R.audio.foot_stop_underwater_04.play();
                }
            }
        }
       
         if(frame<2 || frame >6)
        {
            frame = 3;
        }
    }else{
        frame = 1;
        }
    
    context.drawImage(R.drawable.heroSprite, (frame-1)*tileSize, flipOffset, tileSize, tileSize, gameObject.body.transform.position.x+xOffset, gameObject.transform.position.y+yOffset + crouchOffset, tileSize, tileSize);
}
