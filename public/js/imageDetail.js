
/**
 * Constructor for the SessionViewChart
 *
 */

function ImageDetail(){

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
ImageDetail.prototype.init = function(){
    var self = this;
    self.margin = {top: 20, right: 20, bottom: 20, left: 20};

};

/**

 */
ImageDetail.loadImage = function(imageMetadata){
    var self = this;
    self.im = imageMetadata;
    var nameMatch = self.im.path.match(/.*\/(.*?$)/);
    nameMatch = !!nameMatch[1] ? nameMatch[1] : nameMatch[0];
    var prob = (self.im.prob * 100).toFixed(1);

    d3.select('#selected-image-name').text(`${nameMatch}`);
    d3.select('#selected-image-time').text(`${self.im.time || 'not available'}`);
    d3.select('#selected-image-prob').text(`${prob}%`);
    d3.select('#selected-image-actual').text(`${"ToDo put in a radio button selections"}`);
    d3.select('#selected-image-comment').text(`${"ToDo support comments"}`);


};
