/**
 * Constructor for the SessionViewChart
 *
 */

function ImageChart() {

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
ImageChart.prototype.init = function () {
    var self = this;

    self.margin = {top: 20, right: 20, bottom: 20, left: 20};

};

ImageChart.loadImage = function (imageMetadata) {
    var self = this;
    self.im = imageMetadata;

    var nameMatch = self.im.path.match(/.*\/(.*?$)/);
    nameMatch = !!nameMatch[1] ? nameMatch[1] : nameMatch[0];
    let name = `data/unprocessedImages/${nameMatch}`;
   // let img = d3.select('#image-jpg');
    //var im =  new Image();
    let i = document.getElementById('image-jpg');
    i.onload = function(){
       // d3.select('#image_jpg').attr("src",name);
        //let i = document.getElementById('image-jpg');
        var width = this.width;
        var height = this.height;
        var io = d3.select("#image-brushes")
            .attr("width", width)
            .attr("height", height)
        io.select("rect")
            .attr("width", 50)
            .attr("height", 40)
            .attr("x", 30)
            .attr("y", 30)
            //.classed("image-brush", true)
        console.log("image loaded")
    }
    i.src=name;
    // need to specify onload since otherwise the width and height will not be set


//or however you get a handle to the IMG


};
