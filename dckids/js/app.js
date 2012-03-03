/* Foundation v2.2 http://foundation.zurb.com */
//flot graph options
var options = {
    xaxis: {
        font: { "family": "Georgia" },
        tickColor: '#f4f4f4',
        tickSize: 1,
        tickDecimals: 0,
        show: false
    },
    yaxis: {
        font: { "family": "Georgia" },
        tickColor: '#FFF',
        autoscaleMargin: 0.1,
        show:true,
        position:"right"
    },
    series: {
        lines: {
            show: false,
            lineWidth: 0.5,
            fillColor: '#000000'
        },
        points: {
            show: false,
            fillColor: '#f69680',
            radius: 4,
            lineWidth: 2
        },
        bars: {
            show: true,
            lineWidth: 0,
            fillColor: '#cccccc'
        },
        shadowSize: 0
    },
    colors: ["#0064CD"],
    grid: {
        show: true,
        borderWidth: 0,
        hoverable: true,
        clickable: true
     }
};



jQuery(document).ready(function ($) {
    var mm = com.modestmaps;
    var url = 'http://a.tiles.mapbox.com/v3/newamerica.dckids.jsonp';

    wax.tilejson(url, function(tilejson) {
        var m = new mm.Map('mainMap', new wax.mm.connector(tilejson),
            new mm.Point(900,400));

        m.setCenterZoom(new mm.Location(tilejson.center[1], tilejson.center[0]),
            tilejson.center[2] - 3);

        wax.mm.zoomer(m).appendTo(m.parent);
        wax.mm.interaction(m, tilejson, {
            callbacks: {
                over: function(feature, context) {
                    console.log(feature);
                },
                out: function(context) {}
            },
        });
    });
    var e = $('#mainFlotGraph');
    //main graphing function
    var plot = $.plot(e, [mobileArray], options);

    var mm = com.modestmaps;
    var url = 'http://a.tiles.mapbox.com/v3/newamerica.dckids.jsonp';
});
