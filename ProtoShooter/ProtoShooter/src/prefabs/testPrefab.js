{
    body:{type:BodyTypes.BOX,
        config:{width:8, height:8, isTrigger:false, damp:0.2}
    },
    scripts:{
        testScript:{vx:1}, stiffTriggerFollow:{xOffset:10, yOffset:100}
    },
    renderers:[
    ],
    triggers:{agro:{type:BodyTypes.BOX,
        config:{width:15, height:15}}
    },
    mappings:{"testScript.agroTrigger":"triggers.agro", "stiffTriggerFollow.trigger":"triggers.agro"}
}