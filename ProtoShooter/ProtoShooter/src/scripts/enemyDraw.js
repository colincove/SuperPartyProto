var resId;
function draw(e)
{
    var tileSize = 128;
    var canvas 	= Stage.canvas;
    var context = Stage.superContext;
    var xOffset = -22;
    var yOffset = -20;  
    
     context.drawImage(R.drawable[resId], (gameObject.frame - 1) * tileSize, gameObject.flip ? tileSize:0, tileSize, tileSize, gameObject.body.transform.position.x+xOffset, gameObject.transform.position.y+yOffset, tileSize, tileSize);

}