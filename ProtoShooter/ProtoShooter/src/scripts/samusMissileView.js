function draw(e)
{
    Stage.superContext.beginPath();
    Stage.superContext.drawImage(R.drawable.samusProjectile, gameObject.body.transform.position.x, gameObject.body.transform.position.y, 12, 12);
    Stage.superContext.fill();
}