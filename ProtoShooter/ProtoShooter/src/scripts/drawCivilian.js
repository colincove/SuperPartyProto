function draw(e)
{
    Stage.superContext.setFillStyle("rgb(100,100,100)");
    Stage.superContext.fillRect(gameObject.triggers.areaTrigger.transform.position.x, gameObject.triggers.areaTrigger.transform.position.y, gameObject.triggers.areaTrigger.getWidth(), gameObject.triggers.areaTrigger.getHeight());
}