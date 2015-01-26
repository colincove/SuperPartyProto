var areaTrigger;
function Setup(e)
{
    areaTrigger.addEventListener(Physics.EVENT_ON_ENTER, onEnter);
}
function onEnter(e)
{
    if(e.other.collisionGroup == "civilian")
    {
        e.other.gameObject.destroy();
    }
}
function destroy(e)
{
    areaTrigger.removeEventListener(Physics.EVENT_ON_ENTER, onEnter);
}