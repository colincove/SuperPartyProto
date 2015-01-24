var footTrigger;
var acc = 1.5;
var maxSpeed = 7;
var jumpRepeat = 0;
var jumpRepeatMax = 20;
var fric = 1.3;
var jumpRepeatStrength = 20;
var jumpStrength = 8;
var originalHeight;
var stopJump = false;
var directionInput = Input.getStandardDirectionInput({wasd:true});
var gun;

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
    /*if(gameObject.body.transform.velocity.y>maxSpeed)
    {
        gameObject.body.transform.velocity.y = maxSpeed;
    }
    if(gameObject.body.transform.velocity.y<-maxSpeed)
    {
        gameObject.body.transform.velocity.y = -maxSpeed;
    }*/
  
    if(directionInput.up.isDown)
    {
        if(canJump())
        {
            jump(jumpStrength);
            jumpRepeat++;
            stopJump = false;
        } else if(jumpRepeat < jumpRepeatMax && jumpRepeat != 0)
        {
            //jump(jumpRepeatStrength);
            jumpRepeat++;
        }
    }
    else
    {
        if(!stopJump && gameObject.isFalling && gameObject.body.transform.velocity.y<0)
        {
            stopJump = true;
            gameObject.body.transform.velocity.y = -1;
        }
        jumpRepeat = 0;
    }
    
    if(directionInput.down.isDown)
    {
        if(!gameObject.isCrouching && canJump())
        {
           gameObject.body.height = 40; 
            gameObject.body.transform.move(0, 60);
            gameObject.body.transform.applyForce(0, 0);
            gameObject.isCrouching = true;
            gameObject.message("SetGunOffset", {x:0, y:-40});
        }
       
    }else{
        if(gameObject.isCrouching)
        {
            gameObject.body.transform.move(0, -60);
            gameObject.body.height = originalHeight;
            gameObject.message("SetGunOffset", {x:0, y:0});
        }
        gameObject.isCrouching = false;
    }
    gameObject.isRunning = false;
    if(directionInput.right.isDown && !directionInput.down.isDown)
    {
        gameObject.isRunning = true;
        gameObject.dir = 1;
        gameObject.body.fric = 1;
        if(gameObject.isFalling)
        {
            gameObject.body.transform.setVelocity(maxSpeed, gameObject.body.transform.velocity.y);
        }
        else
        {
            gameObject.body.transform.applyForce(acc, 0);
        }
        
    }
    if(directionInput.left.isDown && !directionInput.down.isDown)
    {
        gameObject.isRunning = true;
        gameObject.dir = -1;
        gameObject.body.fric = 1;
         if(gameObject.isFalling)
        {
            gameObject.body.transform.setVelocity(-maxSpeed, gameObject.body.transform.velocity.y);
        }
        else
        {
            gameObject.body.transform.applyForce(acc * -1, 0);
        }
    }
    if(gameObject.isRunning)
    {
        gameObject.body.fric = fric;
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
   // gameObject.body.transform.applyForce(0, -strength);
}
function doDamage(e)
{
    gameObject.hurt = true;
}
function Setup(e)
{
    originalHeight = gameObject.body.height;
}