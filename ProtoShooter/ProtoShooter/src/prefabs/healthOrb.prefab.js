{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"item", width:10, height:10, isTrigger:false, damp:0.2, static:true}
    },
    scripts:{
        item:{}, healthItem:{addHealth:5}, samusProjectileView:{}
    },
    renderers:[
    ],
    triggers:{
    },
    mappings:{}
}