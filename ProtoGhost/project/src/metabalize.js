var Filters = {};
Filters.threshold = function(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};
function metabalize(ctx, tempCtx, width, height, threshold){
	var imageData = tempCtx.getImageData(0,0,width,height);
	Filters.threshold(imageData, threshold);
	/*
	for (var i = 0, n = pix.length; i <n; i += 4) {
				// Checks threshold
				if(pix[i+3]<threshold){
				   pix[i+3]/=6;
					if(pix[i+3]>threshold/4){
						pix[i+3]=0;
					}
				}
			}
*/
	ctx.putImageData(imageData, 0, 0);  
	//tempCtx.putImageData(imageData, 0, 0);  

}

	