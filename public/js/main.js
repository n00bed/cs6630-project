/*
 * Root file that handles instances of all the charts and loads the visualization
 */
(function(){
    var instance = null;

    /**
     * Creates instances for every chart (classes created to handle each chart;
     * the classes are defined in the respective javascript files.
     */
    function init() {
        //Creating instances for each visualization
        // var votePercentageChart = new VotePercentageChart();
        //
        // var tileChart = new TileChart();
        //
        // var shiftChart = new ShiftChart();

        var imageDetail = new ImageDetail();
        var imageChart = new ImageChart();
        var selectedImagesTable = new SelectedImagesTable();
        var sessionViewChart = new SessionViewChart();

        // load csv with image information
        // Todo: Allow a person to select the file to load
        d3.csv("data/test_data_predictions.csv", function (imageMetadata) {
            sessionViewChart.update(imageMetadata);
            console.log(imageMetadata)
        });
    }

    /**
     *
     * @constructor
     */
    function Main(){
        if(instance  !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function(){
        var self = this
        if(self.instance == null){
            self.instance = new Main();

            //called only once when the class is initialized
            init();
        }
        return instance;
    }

    Main.getInstance();
})();