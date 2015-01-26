function draw(e)
{
    Stage.context.globalAlpha = 0.5;
    Stage.superContext.setFillStyle("rgb(150,100,150)");
    Stage.superContext.fillRect(gameObject.triggers.areaTrigger.transform.position.x, gameObject.triggers.areaTrigger.transform.position.y, gameObject.triggers.areaTrigger.getWidth(), gameObject.triggers.areaTrigger.getHeight());
    Stage.context.globalAlpha = 1;
}