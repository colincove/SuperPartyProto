{
    scripts:{
        triggerSplash:{}, drawWater:{}
    },
    renderers:[
    ],
    triggers:{cavern:{type:BodyTypes.BOX,
        config:{collisionGroup:"cavern", width:(65 - 35)*levelTileSize, height:8*levelTileSize - 20, transform:{position:{x:levelTileSize*34, y:0}}}}, 
            cavern2:{type:BodyTypes.BOX,
        config:{collisionGroup:"cavern", width:1000, height:3000, transform:{position:{x:-500, y:-3500}}}}
    },
    mappings:{}
}