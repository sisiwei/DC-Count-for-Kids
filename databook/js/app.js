jQuery(document).ready(function ($) {
	var mouseX = 0, mouseY = 0;

	$(document).mousemove(function(e){
    	mouseX = e.pageX - 0;
		mouseY = e.pageY - 170;
	});

	var mm = com.modestmaps;
//	var url = 'http://a.tiles.mapbox.com/v3/newamerica.dc-kids6.jsonp';
	var url = 'http://a.tiles.mapbox.com/v3/newamerica.map-y2lhm4ps.jsonp';
	
    wax.tilejson(url, function(tilejson) {
        var tooltip = new wax.tooltip();
        var m = new mm.Map('mainMap', 
        	new wax.mm.connector(tilejson),
            new mm.Point(995,700));

        m.setCenterZoom(new mm.Location(
			38.905, //tilejson.center[1], lon
			-76.956), //tilejson.center[0]), lat
            12); // zoom

        wax.mm.zoomer(m).appendTo(m.parent);

        AvgFamilyI: "91,983"
		AvgPopulat: "8,875"
		ChildCareF: "8"
		Library: "0"
		NBH_NAMES: "North Michigan Park, Michigan Park, University Heights"
		NbhScore: 42.9
		PctAsianPI: "1.5"
		PctBlackNo: "81"
		PctHisp_20: "4.5"
		PctPoorChi: "22"
		PctUnemplo: "13"
		PctWhiteNo: "12"
		Pct_birt_1: "7.9"
		Pct_births: "18"
		PoliceStat: "0"


		wax.mm.interaction()
			.map(m)
			.tilejson(tilejson)
			.on({
				on: function(feature) {

					if (feature){
						var d = feature.data;
						console.log(d);
						if (d.AvgFamilyI != undefined){
							var neighborhoodNames = d.NBH_NAMES,
								averageFamilyIncome = d.AvgFamilyI,
								pctPoorChildren = d.PctPoorChi,
								pctUnemployment = d.PctUnemplo,
								pctBirths = d.Pct_birt_1,
								pctBirthsL = d.Pct_births,
								averagePop = d.AvgPopulat,
								pctBlackNo = d.PctBlackNo,
								pctWhiteNo = d.PctWhiteNo,
								pctHisp_20 = d.PctHisp_20,
								pctAsianPI = d.PctAsianPI,
								childCareF = d.ChildCareF,
								libraryNum = d.Library,
								policeStat = d.PoliceStat,
								schoolHexArray = d.chco,
								schoolValueArray = d.chd;
								$('#school-perf').show();
								$('#nbh-name').html(neighborhoodNames);
								$('#race-pie-chart').html('<strong>Demographics:</strong><br/><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ pctWhiteNo +','+ pctBlackNo +','+ pctHisp_20 +','+ pctAsianPI +'&chdl=White|Black|Hispanic|Asian&chma=|2&chf=bg,s,67676700" width="200" height="120" /></center>');
								$('#avg-income').html('<strong>Avg. family income:</strong> $' + averageFamilyIncome);
								$('#police').html('<strong>Police stations:</strong> ' + policeStat);
								$('#library').html('<strong>Libraries:</strong> ' + libraryNum);
								$('#unemployment').html('<strong>Unemployment:</strong> ' + pctUnemployment + '%');
								$('#poor-children').html('<strong>Children in poverty:</strong> ' + pctPoorChildren + '%');
								$('#child-care').html('<strong>Child care facilities:</strong> ' + childCareF);

								// // INVESTIGATE DATA:
								$('#school-perf-chart').html('<strong>Percentage Proficient and Above</strong><br/><center><img style="padding-top: 5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=290x240&cht=s&chd=t:25,' + schoolValueArray + '&chco=' + schoolHexArray + '&chdl=DC+Average|Nbhd+Schools&chf=bg,s,67676700" width="290" height="240" /></center>')
						} else {
							var schoolName = d.Name,
								address = d.StreetAddress,
								la = d.Latitude,
								lo = d.Longitude,
								countFreeLunch = d.Count_FreeLunch,
								countRedPriceLunch = d.Count_RedPriceLunch,
								countFreeOrReduced = d.Count_FreeOrRedPriceLunch,
								totalStudents = d.TotalStudents,
								pctFreeOrReduced = d.Pct_FreeOrRedPriceLunch,
								countNonFreeOrReduced = d.Count_NonFreeOrRedPriceLunch,
								elemOrSec = d.ElemOrSec,
								mathPct = d.Math_Pct_ProficientOrAdvanced,
								readingPct = d.Read_Pct_ProficientOrAdvanced;
							$('#school-data').show();
							$('#school-data').html('<strong>School details</strong><br/><strong>Lunches</strong><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ countFreeLunch +','+ countRedPriceLunch +','+ countNonFreeOrReduced +'&chdl=Free|Reduce|Other&chma=|2&chf=bg,s,67676700" width="175" height="100" /></center><strong>Percentage Proficient and Above</strong><center><img style="padding-top:5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=190x100&cht=s&chd=t:25,75|'+ mathPct +','+ readingPct +'&chco=9970AB&chf=bg,s,67676700" width="190" height="100" /></center>');
							$('#school-data').fadeIn(150);
							$('#school-tooltip').html('<strong>' + schoolName + '</strong><br/>Total students: '+ totalStudents);
							$('#school-tooltip').css({"top": mouseY, "left": mouseX-225})
							$('#school-tooltip').fadeIn(150);
						}							
					}
				},
				off: function(feature) {
					$('#school-tooltip').fadeOut(100);
					$('#school-data').fadeOut(100);
				}
			});
    });
});
