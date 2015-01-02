{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"hero", width:55, height:90, isTrigger:false, damp:0.2}
    },
    scripts:{
        samusController:{}, stiffTriggerFollow:{xOffset:20, yOffset:78}, drawRobot:{}
    },
    renderers:[
    ],
    triggers:{foot:{type:BodyTypes.BOX,
        config:{collisionGroup:"hero", width:15, height:15}}
    },
    mappings:{"samusController.footTrigger":"triggers.foot", "stiffTriggerFollow.trigger":"triggers.foot"}
}