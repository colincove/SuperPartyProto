function CollisionOnEnter(e)
{
    if(e.other.collisionGroup == "hero")
    {
        gameObject.message("Collected", {});
        gameObject.destroy();
    }
}