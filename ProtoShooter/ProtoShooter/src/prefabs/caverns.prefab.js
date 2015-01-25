{
    scripts:{
        triggerSplash:{}, drawWater:{}
    },
    renderers:[
    ],
    triggers:{cavern:{type:BodyTypes.BOX,
        config:{collisionGroup:"cavern", width:1000, height:1000, transform:{position:{x:-400, y:-1300}}}}, 
            cavern2:{type:BodyTypes.BOX,
        config:{collisionGroup:"cavern", width:1000, height:1000, transform:{position:{x:800, y:0}}}}
    },
    mappings:{}
}