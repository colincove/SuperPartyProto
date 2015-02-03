var health = 10;
function Setup(e)
{
    gameObject.totalHealth = health;
    gameObject.health = health;
    
    
}
function doDamage(e)
{
    gameObject.health-= e.strength;
    if(gameObject.health<=0)
    {
        gameObject.destroy();
    }
}
gameObject.addHealth = function(health)
{
    this.health += health;
    if(this.health > this.totalHealth)
    {
        this.health = this.totalHealth;
    }
}