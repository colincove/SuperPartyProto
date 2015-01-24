function draw(e)
{
    if(SplashEffect.submerged)return;
    
    for(var i in gameObject.triggers)
    {
        Stage.superContext.setFillStyle("rgba(0, 0, 100, 10)");
        Stage.superContext.fillRect(gameObject.triggers[i].transform.position.x, gameObject.triggers[i].transform.position.y, gameObject.triggers[i].getWidth(), gameObject.triggers[i].getHeight());
         //Stage.superContext.fillRect(0,0, 100, 100);
        //sStage.superContext.fill();
    }
}