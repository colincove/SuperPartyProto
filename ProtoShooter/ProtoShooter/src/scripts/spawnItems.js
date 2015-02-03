function destroy(e)
{
    var random = Math.random();
    var item;
    console.log(random);
    if(random < 0.25)
    {
        item = Prefab.instantiate(Prefab.prefabs['missileItem']);
    }
    else if(random < 0.50)
    {
        item = Prefab.instantiate(Prefab.prefabs['missileItem']);
    }
    else if(random < 0.75)
    {
        item = Prefab.instantiate(Prefab.prefabs['healthOrb']);
    }
    else{
        item = Prefab.instantiate(Prefab.prefabs['healthOrb']);
    }
    
    item.body.transform.setPosition(gameObject.body.transform.position.x, gameObject.body.transform.position.y);
    
}