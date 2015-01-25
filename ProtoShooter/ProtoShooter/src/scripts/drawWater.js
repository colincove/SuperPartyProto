var padding = 400;
function draw(e)
{
    //if(SplashEffect.submerged)return;
    Stage.context.globalAlpha = 0.8;
    if(SplashEffect.submerged)
    {
          for(var i in gameObject.triggers)
        {

            Stage.superContext.setFillStyle("rgb(6, 7, 10)");
            Stage.superContext.fillRect(gameObject.triggers[i].transform.position.x - padding, gameObject.triggers[i].transform.position.y - padding, gameObject.triggers[i].getWidth() + padding, padding);
            Stage.superContext.fillRect(gameObject.triggers[i].transform.position.x +gameObject.triggers[i].getWidth(), gameObject.triggers[i].transform.position.y - padding, padding, gameObject.triggers[i].getHeight() + padding);
             Stage.superContext.fillRect(gameObject.triggers[i].transform.position.x, gameObject.triggers[i].transform.position.y + gameObject.triggers[i].getHeight(), gameObject.triggers[i].getWidth() + padding, padding);
             Stage.superContext.fillRect(gameObject.triggers[i].transform.position.x - padding, gameObject.triggers[i].transform.position.y, padding, gameObject.triggers[i].getHeight() + padding);
             //Stage.superContext.fillRect(0,0, 100, 100);
            //sStage.superContext.fill();
        }
    }
    else
    {
          for(var i in gameObject.triggers)
    {
        
        Stage.superContext.setFillStyle("rgb(52, 56, 95)");
        Stage.superContext.fillRect(gameObject.triggers[i].transform.position.x, gameObject.triggers[i].transform.position.y, gameObject.triggers[i].getWidth(), gameObject.triggers[i].getHeight());
         //Stage.superContext.fillRect(0,0, 100, 100);
        //sStage.superContext.fill();
    }
    }
  
    Stage.context.globalAlpha = 1;
}