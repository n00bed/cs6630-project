

var cellWidth = 70,
    cellHeight = 20,
    cellBuffer = 15,
    barHeight = 20;

/**used for barchart **/

var barScale = d3.scaleLinear()
    .range([0,cellWidth]);


/**
 * Constructor for the SelectedImagesTable
 *
 */


function SelectedImagesTable(){

    var self = this;
    self.init();
};


/**
 * Initializes the svg elements required for this chart
 */
SelectedImagesTable.prototype.init = function(){
    var self = this;
    self.margin = {top: 20, right: 20, bottom: 20, left: 20};
};

SelectedImagesTable.update = function(selectedImages){

    d3.selectAll("tbody > tr").remove();

    var self = this;
    self.sm = selectedImages;
    console.log("updating selected images table")

    var rows = d3.select("#selected-images > tbody")
        .selectAll("tr")
        .data(self.sm)



    var rowEnter = rows.enter().append("tr");

    rows = rows.merge(rowEnter)
        .attr("id",function(d,i){
            return i;
        })

    let cols = rows.selectAll("td")
        .data(function(d,i){
            var name = d.path.match(/.*\/(.*?$)/);
            name = !!name[1] ? name[1] : name[0];
            return [
                {thumb:name, col:1},
                {name:name,col:2},
                {prob:d.prob,col:3},
                {actual:d.actualClass,col:4},
                {comment:d.comment, col:5}
            ]
        })

    colsEnter = cols.enter()
        .append('td');
    cols = cols.merge(colsEnter)

    this.updateThumbCol(cols);
    this.updateNameCol(cols);
    this.updateProbCol(cols);
    this.updateActualCol(cols);

};


SelectedImagesTable.updateThumbCol = function(cols){
    var names = cols.filter(function(d){
        return d.col == 1
    })

    svg = names.append("svg")
        .attr("width",100)
        .attr("height", 100)


    svg.append('image')
        .attr("xlink:href", function(d){
            return "data/unprocessedImages/" + d.thumb;
        })
        .attr('x', 0)
        .attr('y', 0)
        .attr("width", 100)
        .attr("height", 100)



}


SelectedImagesTable.updateNameCol = function(cols){
    var names = cols.filter(function(d){
        return d.col == 2
    });

    names.append("text")
        .text(function(d){
            return d.name

        })

}


SelectedImagesTable.updateProbCol = function(cols){
    var names = cols.filter(function(d){
        return d.col == 3
    });


    svg = names.append("svg")
        .attr("width", cellWidth)
        .attr("height", cellHeight)

     svg.append("rect");

    names.select("rect")
        .attr("height", barHeight)
        .attr("width", function(d){
            return barScale(d.prob);
        })
        .attr("fill", "steelblue")


    svg.append("text")
        .attr("x", function(d){
            return barScale(d.prob);
        })
        .attr("y", cellHeight/2)
        .text(function(d){
            return d.prob
        })
}


SelectedImagesTable.updateActualCol = function(cols){
    var names = cols.filter(function(d){
        return d.col == 4
    });

    svg = names.append("svg")
        .attr("width",100)
        .attr("height", 100)

    // svg.append("text")
    //     .text(function(d){
    //         return d.actual;
    //     })

    circle = svg.append('circle')
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 10)


}

