{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"heroProjectile", width:15, height:15, isTrigger:false, damp:0.2}
    },
    scripts:{
        projectile:{speed:20, cooldown:200, strength:5}, samusMissileView:{}
    },
    renderers:[
    ],
    triggers:{
    },
    mappings:{}
}