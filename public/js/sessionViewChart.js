
/**
 * Constructor for the SessionViewChart
 *
 */

function SessionViewChart(){
    var self = this;
    self.init();
};

SessionViewChart.prototype.init = function(){
    var self = this;
    self.ImageDetail = ImageDetail;
    self.ImageChart = ImageChart;
    self.selectedImagesTable = SelectedImagesTable;
    self.margin = {top: 20, right: 20, bottom: 20, left: 20};

    //Gets access to the div element created for this chart from HTML
    var divSv = d3.select("#session-view").classed("content", true);
    self.svgBounds = divSv.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 200+self.margin.top+self.margin.bottom;

    //creates svg element within the div
    self.svg = divSv.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)

    self.widthScale = d3.scaleLinear()
        .range([0,self.svgWidth-self.margin.left - self.margin.right]);
    self.heightScale = d3.scaleLinear()
        .domain([0,1]) // Probability of a hand raise
        .range([0,self.svgHeight-self.margin.top-self.margin.bottom])

};

SessionViewChart.prototype.update = function(imageMetadata){
    var self = this;
    self.im = imageMetadata;
    self.widthScale.domain([0,self.im.length]);
    self.selectedImages = [];
    var brushed= ()=>{
         pixelRange = d3.event.selection;
        if(!!pixelRange && pixelRange.length==2){
            self.selectedImages = self.getImageListFromBrushCoords(pixelRange);
            self.selectedImagesTable.update(self.selectedImages)
        }
    }
    var brush = d3.brush().extent([[0,0],[self.svgWidth,self.svgHeight]]).on("end", brushed);
    d3.select('#session-view').select("svg").append("g")
        .attr("class", "brush").call(brush);
    // create x by y html
    let points = d3.select('#session-view')
        .select("svg")
        .selectAll("circle")
        .data(self.im);
    points.exit().remove();
    let enterPoints = points.enter()
        .append("circle");
    points = enterPoints.merge(points)
        .attr('cx',function(d, i){
            return self.margin.right+self.widthScale(i)
        })
        .attr('cy',function(d){
            return (self.margin.top + self.heightScale(1-d.prob));
        })
        .attr("class",function(d){
            if(d.actualClass==1){
                return "isEventCircle"
            } else if (d.actualClass==0){
                return "notEventCircle"
            } else{
                return "unknownCircle"
            }
        })
        .attr("pointer-events","all") // http://jsfiddle.net/7j8cr/2/ allow both brush and clicking of individual images
        .on("mouseover",function(d){
            console.log("I saw mouse")
        })
        .on("click",function(d,i){
            self.updateSelection(i);
            self.loadImage(this,d);
        });
};
SessionViewChart.prototype.updateSelection=(imageNumber)=>{
    d3.select("#session-view")
        .select("svg")
        .selectAll("circle")
        .each(function(d,i){
            d3.select(this)
                .classed("selectedPoint",function(d){
                    return i==imageNumber;
                })
        })
}
SessionViewChart.prototype.getImageListFromBrushCoords=(brushCoords)=>{
    var self = this;

    var brushedImages = [];
    var isBrushed = (d) => {
        var topLeft = brushCoords[0];
        var bottomRight = brushCoords[1];
        var p = d3.select(d);
        var cx = p.attr("cx");
        var cy = p.attr("cy");
        if(cx > topLeft[0] && cx < bottomRight[0] && cy > topLeft[1] && cy < bottomRight[1]){
            return true;
        }
        return false;
    }
    d3.select("#session-view")
        .select("svg")
        .selectAll("circle")
        .each(function(d,i){
            d3.select(this)
                .classed("brushedPoint",function(d){
                    if(isBrushed(this)){
                        brushedImages.push(d);
                        return true;
                    }
                    else{
                        return false;
                    }
                })
        });
    console.log(`there are ${brushedImages.length} brushed images`)
    return brushedImages;
};
SessionViewChart.prototype.loadImage= (node, data)=>{
    self.ImageDetail.loadImage(data);
    self.ImageChart.loadImage(data);
};