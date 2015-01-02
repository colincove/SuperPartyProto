var footTrigger;
var acc = 1;
var maxSpeed = 5;
var jumpRepeat = 0;
var jumpRepeatMax = 5;
var fric = 1;
var jumpRepeatStrength = 1;
var jumpStrength = 5;
var directionInput = Input.getStandardDirectionInput({wasd:true});
function update(e)
{
    
	gameObject.isFalling = !canJump();
    gameObject.body.fric = fric;

    if(gameObject.body.transform.velocity.x>maxSpeed)
    {
        gameObject.body.transform.velocity.x = maxSpeed;
    }
    if(gameObject.body.transform.velocity.x<-maxSpeed)
    {
        gameObject.body.transform.velocity.x = -maxSpeed;
    }
    if(gameObject.body.transform.velocity.y>maxSpeed)
    {
        gameObject.body.transform.velocity.y = maxSpeed;
    }
    if(gameObject.body.transform.velocity.y<-maxSpeed)
    {
        gameObject.body.transform.velocity.y = -maxSpeed;
    }
   
    if(directionInput.up.isDown)
    {
        if(canJump())
    {
        jump(jumpStrength);
        jumpRepeat++;
    } else if(jumpRepeat < jumpRepeatMax && jumpRepeat != 0)
        {
            jump(jumpRepeatStrength);
            jumpRepeat++;
        }
    }
    else
    {
        jumpRepeat = 0;
    }
    gameObject.isCrouching = false;
    if(directionInput.down.isDown)
    {
        gameObject.body.transform.applyForce(0, acc);
        gameObject.isCrouching = true;
    }
    gameObject.isRunning = false;
    if(directionInput.right.isDown && !directionInput.down.isDown)
    {
        gameObject.isRunning = true;
        gameObject.dir = 1;
        gameObject.body.fric = 1;
        gameObject.body.transform.applyForce(acc, 0);
    }
    if(directionInput.left.isDown && !directionInput.down.isDown)
    {
        gameObject.isRunning = true;
        gameObject.dir = -1;
        gameObject.body.fric = 1;
        gameObject.body.transform.applyForce(-acc, 0);
    }

}
function canJump()
{
    for(var i in footTrigger.collisionTable)
    {
        var body = footTrigger.collisionTable[i];
        if(body.collisionGroup == "ground")
        {
            return true;
        }
    }
    return false;
}

function jump(strength)
{
    gameObject.body.transform.applyForce(0, -strength);
}