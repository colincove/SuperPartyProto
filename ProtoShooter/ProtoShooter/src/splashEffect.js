var SplashEffect = {};

SplashEffect.wl = 0.3;
SplashEffect.a = 20;
SplashEffect.x = 0;
SplashEffect.waving = false;
SplashEffect.acc = 1;//.05 - .01

SplashEffect.start = function()
{
    Looper.addEventListener(Looper.EVENT_DRAW_TICK, SplashEffect.draw);
    SplashEffect.waving = true;
}
SplashEffect.stop = function()
{
    Looper.removeEventListener(Looper.EVENT_DRAW_TICK, SplashEffect.draw);
}
SplashEffect.draw = function(e)
{
    var context = Stage.context;
    var imageData = context.getImageData( 0, 0, Stage.canvas.width, Stage.canvas.height );
    var pixels = imageData.data;
    
    var tmpImageData = context.getImageData( 0, 0, Stage.canvas.width, Stage.canvas.height );
    var tmpPixels = tmpImageData.data;
    
    var y;
    var tmp;
    var ynew;
    var inew;
    var c;
    
    SplashEffect.wl -= 0.03;
    SplashEffect.a = SplashEffect.a*0.70;
    
    if(SplashEffect.a < 0.1) SplashEffect.waving = false;
    SplashEffect.x+=SplashEffect.acc;
    
    for(var i = 0; i < pixels.length; i+=16)
    {
        
       
        inew = Math.round(i/4);
        c = (Math.sin(((inew - Math.round(inew/Stage.canvas.width) * Stage.canvas.width)+SplashEffect.x)*SplashEffect.wl))*SplashEffect.a;
     
        y = Math.round((inew) / Stage.canvas.width);
        
        ynew =  y + Math.round(c);
        if(SplashEffect.waving)
        {
        if(y>0 && y<Stage.canvas.height)
        {
            //var tmp = Math.round(ynew * (inew/Stage.canvas.width) * Stage.canvas.width + i % (Stage.canvas.width*3));
            tmp = Math.round(ynew * (Stage.canvas.width * 4) + i % (Stage.canvas.width*4));
            pixels[i] = tmpPixels[tmp];
             pixels[i+1] = tmpPixels[tmp+1];
             pixels[i+2] = tmpPixels[tmp+2];
              pixels[i+3] = tmpPixels[tmp+3];
            //
             pixels[i+4] = tmpPixels[tmp+4];
             pixels[i+5] = tmpPixels[tmp+5];
             pixels[i+6] = tmpPixels[tmp+6];
              pixels[i+7] = tmpPixels[tmp+7];
            //
             pixels[i+8] = tmpPixels[tmp+8];
             pixels[i+9] = tmpPixels[tmp+9];
             pixels[i+10] = tmpPixels[tmp+10];
              pixels[i+11] = tmpPixels[tmp+11];
            //
             pixels[i+12] = tmpPixels[tmp+12];
             pixels[i+13] = tmpPixels[tmp+13];
             pixels[i+14] = tmpPixels[tmp+14];
              pixels[i+15] = tmpPixels[tmp+15];
        }  
             }
        pixels[i+2] += 50;
        pixels[i+6] += 50;
        pixels[i+10] += 50;
        pixels[i+14] += 50;
    }
    context.putImageData( imageData, 0, 0 );
}
SplashEffect.splash = function()
{
    
}
