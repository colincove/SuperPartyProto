{
    body:{type:BodyTypes.BOX,
        config:{collisionGroup:"civilian", width:20, height:20}
    },
    scripts:{
        civilianLogic:{}, stiffTriggerFollow:{xOffset:-18, yOffset:-70}, health:{health:10}, drawCivilian:{}
    },
    renderers:[
    ],
    triggers:{areaTrigger:{type:BodyTypes.BOX,
        config:{collisionGroup:"civilian", width:55, height:90}}
    },
    mappings:{"civilianLogic.areaTrigger":"triggers.areaTrigger", "stiffTriggerFollow.trigger":"triggers.areaTrigger"}
}