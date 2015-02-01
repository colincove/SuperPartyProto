{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"heroProjectile", width:10, height:10, isTrigger:false, damp:0.2}
    },
    scripts:{
        projectile:{speed:20, cooldown:100, soundType:"hero"}, samusProjectileView:{}
    },
    renderers:[
    ],
    triggers:{
    },
    mappings:{}
}