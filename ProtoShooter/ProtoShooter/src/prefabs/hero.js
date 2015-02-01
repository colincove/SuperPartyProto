{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"hero", width:55, height:90, drag:1, fric:3}
    },
    scripts:{
        samusController:{}, stiffTriggerFollow:{xOffset:20, yOffset:78}, drawRobot:{}, gun:{key:80, spawnX:60, spawnY:20, cooldown:250, projectile:"samusBullet", targetGroup:"enemy", soundType:"heroLaser"}, health:{health:10}
    },
    renderers:[
    ],
    triggers:{foot:{type:BodyTypes.BOX,
        config:{collisionGroup:"hero", width:15, height:15}}
    },
    mappings:{"samusController.footTrigger":"triggers.foot", "stiffTriggerFollow.trigger":"triggers.foot"}
}