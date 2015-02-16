{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"enemy", width:70, height:90, isTrigger:false}
    },
    scripts:{scorpionLogic:{}, enemyDraw:{resId:"scorpionSprite"}, gun:{spawnX:100, spawnY:5, projectile:"scorpionBullet", targetGroup:"hero"}, health:{health:3}, stiffTriggerFollow:{xOffset:-400, yOffset:-400}, spawnItems:{}}, 
    renderers:[
    ],
    triggers:{agro:{type:BodyTypes.BOX,
        config:{collisionGroup:"enemy", width:800, height:800}}},
    mappings:{"stiffTriggerFollow.trigger":"triggers.agro", "scorpionLogic.agroTrigger":"triggers.agro"}
}