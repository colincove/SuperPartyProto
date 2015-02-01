var speed = 5;
var strength = 1;
var soundType;
function update(e)
{
    gameObject.body.transform.setVelocity(speed * gameObject.dir, 0);
}
function CollisionOnEnter(e)
{
    
    
    
    if(e.other.collisionGroup == gameObject.targetGroup)
    {
        if(soundType == "hero")
        {
            var random = Math.round(Math.random()*3);

        if(random == 0)
        {
            R.audio.scorpion_hit_01.play();
        }
        else if(random == 1)
        {
             R.audio.scorpion_hit_02.play();
        }
        else if(random == 2)
        {
             R.audio.scorpion_hit_03.play();
        }
        }
      e.other.gameObject.message("doDamage", {strength:strength});
    }
     gameObject.destroy();
    
    
    
}
function CollisionOnExit(e)
{
    
}