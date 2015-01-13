var health = 10;
function doDamage(e)
{
    health-= e.strength;
    if(health<=0)
    {
        gameObject.destroy();
    }
}