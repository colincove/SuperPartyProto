function draw(e)
{
    Stage.context.fillStyle = "#d4d5e2";
    Stage.context.fillRect(10, 10, 100, 30);
    
    Stage.context.fillStyle = "#adaebb";
    Stage.context.fillRect(15, 15, 90, 20);
    
    Stage.context.fillStyle = (gameObject.health / gameObject.totalHealth) > 0.5 ? "#7fde7a":"#e4e876";
    
    if((gameObject.health / gameObject.totalHealth) > 0.5)
    {
        Stage.context.fillStyle = "#7fde7a";
    }
    else if((gameObject.health / gameObject.totalHealth) > 0.25)
    {
        Stage.context.fillStyle = "#e4e876";
    }
    else
    {
        Stage.context.fillStyle = "#e87676";
    }
    
    Stage.context.fillRect(15, 15, 90 * (gameObject.health / gameObject.totalHealth), 20);
}