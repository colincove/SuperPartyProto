{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"elevator", width:20, height:20, static:true}
    },
    scripts:{
        elevatorLogic:{}, drawElevator:{}, stiffTriggerFollow:{xOffset:-100, yOffset:-280}
    },
    renderers:[
    ],
    triggers:{areaTrigger:{type:BodyTypes.BOX,
        config:{collisionGroup:"civilian", width:200, height:300}}
    },
    mappings:{"elevatorLogic.areaTrigger":"triggers.areaTrigger", "stiffTriggerFollow.trigger":"triggers.areaTrigger"}
}