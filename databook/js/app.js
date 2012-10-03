var clickScroll = false,
	eventOffset = 50,
	currentIndicator;

jQuery(document).ready(function ($) {
	var mouseX = 0, mouseY = 0,
		sidebar = $('#info'),
		banner = $('#databook-content').find('#banner'),
		crossTabNav = $('.crosstab-nav-wrapper'),
		map,
		currentMap;

	var baseURL = 'dcaction.map-7j45adj0';

	// LOADING ALL CONTENT
	SimpleTable.init( { key: '0AntoWTCD8D_UdEdsLUxEVnlxZXdjRThLeS1oS1pXRHc', callback: contentFill } );

	// INFOBOX SETTINGS AND INIT
	var indicators = $('#indicator-list'),
		selected = $('#indicators').find('.selected'),
		toggleTime = 250,
		arrow = $('.arrow'),
		prevBtn = $('.arrow-left'),
		nextBtn = $('.arrow-right');

	buildDropdown(indicatorData);
	selected.html(indicators.find('li.active').html());

	selected.click(function(){
		indicators.slideToggle(toggleTime, 'linear');
	});

	indicators.find('li').click(function(){
		indicators.slideUp(toggleTime, 'linear');
		if (!$(this).hasClass('active')){
			selected.html($(this).html());
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');

			var sIdx = indicators.find('li').index(this);
			currentIndicator = indicatorData[sIdx];
			callMap(indicatorData[sIdx].mapURL);
			legendFill(indicatorData[sIdx]);

			sIdx == 0 ? prevBtn.removeClass('hover').addClass('fade') : prevBtn.removeClass('fade').addClass('hover');
			sIdx == indicators.find('li').length - 1 ? nextBtn.removeClass('hover').addClass('fade') : nextBtn.removeClass('fade').addClass('hover');
		}
	});

	arrow.click(function(){
		if (!$(this).hasClass('fade')){
			var currIdx = indicators.find('li.active').index(),
				newIdx = $(this).hasClass('arrow-left') ? currIdx - 1 : currIdx + 1 ;

			if (newIdx != -1){
				indicators.find('li').get(newIdx).click();
			}

			newIdx == 0 ? prevBtn.addClass('fade') : prevBtn.removeClass('fade');
			newIdx == indicators.find('li').length - 1 ? nextBtn.addClass('fade') : nextBtn.removeClass('fade');
		}
	});

	scrollToFunc(crossTabNav);

    $(window).scroll(function(){ stickyNav(banner); });

	$('.secondary').add('#banner').mouseover(function(e){
       	$('.tooltip').hide();
	});

	// BUILD THE MAP ITSELF
	var initIdx = indicators.find('li').index(indicators.find('li.active'));
	currentIndicator = indicatorData[initIdx];
	buildMap(baseURL, currentIndicator.mapURL);
	callMap(indicatorData[initIdx].mapURL);
	legendFill(indicatorData[initIdx]);

}); // end document ready
	
function buildMap(baseURL, initialMap){
	$('#mainMap').html('');
    map = mapbox.map('mainMap', null, null,[MM.DragHandler(), MM.DoubleClickHandler()]);

	map.addLayer(mapbox.layer().id(baseURL));
	map.addLayer(mapbox.layer().id(initialMap));
	currentMap = initialMap;
	// console.log(map.layers);

  	map.centerzoom({lat: 38.900,lon: -77.020}, 12);
  	map.ui.zoomer.add();
  	map.setZoomRange(11,16);
  	map.setPanLimits([{ lat: 39.008, lon: -77.165 }, { lat: 38.782, lon: -76.874 }]);

  	var mapurl = 'http://a.tiles.mapbox.com/v3/dcaction.transparent-dc,dcaction.graduation_rates.jsonp';
	var mm = com.modestmaps;

	    // mousemove
    $(window).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;

        var windowWidth = $(window).width();
        var windowHeight = $('#mainMap').height();
        if (mouseX > windowWidth/5 * 3) {
        	mouseX = currentIndicator.dataTag != 'graduation'
        			?  mouseX = mouseX - $('#floating-tooltip').width() - 50
					: mouseX = mouseX - $('#school-tooltip').width() - 50;
        }

        if (mouseY > (windowHeight/4 * 3)){
            mouseY = mouseY - $('.tooltip').height();
        }

        $('.tooltip').stop().css({
            left: mouseX + 20,
            top:  mouseY - 14
        });
    });

	wax.tilejson(mapurl, function(tilejson) {
	    var tooltip = new wax.tooltip();
		wax.mm.interaction()
			.map(map)
			.tilejson(tilejson)
			.on({
				on: function(feature) {
					if (feature){
						var d = feature.data;

						if (d.NBH_NAMES != undefined){
							$('.indicator-floats').show();
							if (currentIndicator.dataTag != 'graduation'){
								$('#floating-tooltip').show();
							}							
							var neighborhoodNames = d.NBH_NAMES,
								indicatorVal = d[currentIndicator.dataTag],
								displayNum = (currentIndicator.multiplier != 1) ? (indicatorVal * currentIndicator.multiplier).toFixed(1) : (indicatorVal * currentIndicator.multiplier).toFixed(0),
								pop = d.PopTotal,
								childPop = (d.PopU18).toFixed(0),
								babyPop = d.PopU5,
								pctWhite = (d.PopNHW * 100).toFixed(1),
								pctWhiteLegend = "White: " + pctWhite + "%",
								pctWhite18 = (d.PopNHW18 * 100).toFixed(1),
								pctWhite18Legend = "White: " + pctWhite18 + "%",

								pctBlack = (d.PopNHB * 100).toFixed(1),
								pctBlackLegend = "Black: " + pctBlack + "%",
								pctBlack18 = (d.PopNHB18 * 100).toFixed(1),
								pctBlack18Legend = "Black: " + pctBlack18 + "%",

								pctOther = (d.PopNHO * 100).toFixed(1),
								pctOtherLegend = "Asian/Other: " + pctOther + "%",
								pctOther18 = (d.PopNHO18 * 100).toFixed(1),
								pctOther18Legend = "Asian/Other: " + pctOther18 + "%",

								pctHisp = (d.PopHisp * 100).toFixed(1),
								pctHispLegend = "Hispanic: " + pctHisp + "%",
								pctHisp18 = (d.PopHisp18 * 100).toFixed(1),
								pctHisp18Legend = "Hispanic: " + pctHisp18 + "%",

								childPov = d.ChildPov,
								medianFamilyIncome = d.MedFamIncR,
								singleMotherFamilies = (d.SingleMomF * 100).toFixed(1);

								$('#nbh-name').html(neighborhoodNames);
								//$('#definition').html(currentIndicator.label);
								$('#floating-tooltip').html( displayNum + currentIndicator.labelEnd);
								$('#total-pop .value').html(addCommas(pop));
								$('#child-pop .value').html(addCommas(childPop));
								$('#avg-income .value').html('$' + addCommas(medianFamilyIncome));
								$('#poor-children .value').html((childPov * 100).toFixed(1) + '%');
								$('#single-mother-families .value').html(singleMotherFamilies + '%');
								$('#adult-race-pie-chart').html('<strong>Race & ethnicity (18 and over):</strong><br/><img src="http://chart.apis.google.com/chart?chs=220x120&cht=p&chco=3182bd|6baed6|bdd7e7|eff3ff&chds=0,700&chd=t:'+ pctWhite +','+ pctBlack +','+ pctHisp +','+ pctOther +'&chdl='+ pctWhiteLegend +'|' + pctBlackLegend + '|'+ pctHispLegend +'|'+ pctOtherLegend+'&chma=|2&chf=bg,s,67676700" width="220" height="120" />');
								$('#child-race-pie-chart').html('<strong>Race & ethnicity (under 18):</strong><br/><img src="http://chart.apis.google.com/chart?chs=220x120&cht=p&chco=e34a33|fc8d59|fdcc8a|fef0d9&chds=0,700&chd=t:'+ pctWhite18 +','+ pctBlack18 +','+ pctHisp18 +','+ pctOther18 +'&chdl='+ pctWhite18Legend +'|' + pctBlack18Legend + '|'+ pctHisp18Legend +'|'+ pctOther18Legend+'&chma=|2&chf=bg,s,67676700" width="220" height="120" />');

								$('#school-tooltip').hide();
						} else {
							if (currentIndicator.dataTag == 'graduation'){
								var floater = '<strong>' + d.schoolname + '</strong><br/>Graduation rate: ' + (d.gradrate * 100).toFixed(1) + '%';
								$('#school-tooltip').html(floater);
								$('#school-tooltip').show();
							}	
						}							
					}
				},
				off: function(feature) {
					$('#school-tooltip').hide();
					$('#floating-tooltip').hide();
				}
		});
	});
};

function callMap(newMap){
	map.removeLayerAt(1);
	map.addLayer(mapbox.layer().id(newMap));
	currentMap = newMap;
}

function legendFill(obj){
	var legend = $('#legend');

	$.each(legend.find('.label'), function(k, v){
		if (obj.cutPoints[0] != null){			
			var txt = k == 0 ? 'More than ' + (obj.cutPoints[k] * obj.multiplier).toFixed(0) + obj.cutPointLabel
				: k == legend.find('.label').length - 1 ? 'Less than ' + (obj.cutPoints[k-1] * obj.multiplier).toFixed(0) + obj.cutPointLabel
				: (obj.cutPoints[k] * obj.multiplier).toFixed(0) + ' to ' + (obj.cutPoints[k-1] * obj.multiplier).toFixed(0) + obj.cutPointLabel;
			$(v).html(txt);
			legend.show();
		} else {
			legend.hide();
		}
	});

}

function contentFill(c){
	// Write all the data:
	$.each(c, function(k,v){
		$('#' + v.section).find(v.h).html(v.head);
		$('#' + v.section).find(v.s).html(v.subhead);
	})
}

function buildDropdown(data){
	$.each(data, function(k,v){
		if (k == 0) {
			$('#indicator-list').append('<li class="active" data-map="' + v.dataTag + '">' + v.name + '</li>');
		} else {
			$('#indicator-list').append('<li data-map="' + v.dataTag + '">' + v.name + '</li>');
		}
	})
}

function scrollToFunc(crossTabNav){
	// scrollTo
	var scrollSpeed = 500;

	crossTabNav.find('li').children('a').click(function(e){
		e.preventDefault();
		$('.tooltip').hide();

		if (!$(this).hasClass('selected')){
			var thisId = $(this).attr('href'),
				object = $(thisId);

	        clickScroll = true;

			if (thisId == '#'){
				$.scrollTo($('#databook-content'), scrollSpeed, {
					axis:'y',
					onAfter:function() {
						crossTabNav.find('.selected').removeClass('selected');
						clickScroll=false;
					}
				});

			} else {
				$.scrollTo( object, scrollSpeed, {
					axis:'y',
					offset: crossTabNav.hasClass('fixed') ? -crossTabNav.height() : 5,
					onAfter:function() {
						$(this).addClass('selected');
						clickScroll=false;
					}
				});
			}			
		}
	});

	crossTabNav.find('#crosstab-title').click(function(e){
		e.preventDefault();
		$('.tooltip').hide();
				
		$.scrollTo($('#databook-content'), scrollSpeed, {
			axis:'y',
			onAfter:function() {
				crossTabNav.find('.selected').removeClass('selected');
				clickScroll=false;
			}
		});
	});
}

function stickyNav(banner){
    var bannerPos = banner.position().top + banner.height() + 85;
    var crossTabNav = $('.crosstab-nav-wrapper');

    if ($(window).scrollTop() > bannerPos){
    	crossTabNav.find('#crosstab-title').addClass('pointer').html('2012 e-Databook');
    	crossTabNav.find('.social-share').show();
    	crossTabNav.find('#scrollTo-top').removeClass('disabled');
        crossTabNav.addClass('fixed').css('top','0').next()
        .css('padding-top','40px');

    } else {
		crossTabNav.find('#crosstab-title').removeClass('pointer').html('Cross-tab analysis');
    	crossTabNav.find('.social-share').hide();
    	crossTabNav.find('#scrollTo-top').addClass('disabled');
        crossTabNav.removeClass('fixed').next()
        .css('padding-top','0');
    }	

    // don't change nav if nav click caused scroll
    if (!clickScroll) {
    	if (scrollY < $('.secondary:eq(0)').offset().top && crossTabNav.find('a').hasClass('selected')) {
    		crossTabNav.find('.selected').removeClass('selected');
    	}

        $.each($('.secondary'), function(i,e) {
            var ePos = $(e).offset() && $(e).offset().top;
            var diff = ePos - scrollY;
            if (diff <= eventOffset) {
            	crossTabNav.find('.selected').removeClass('selected');
                crossTabNav.find('.crosstab-nav').find('li:eq('+ i +')').find('a').addClass('selected');
            }
        });
    }
    // end wp-graphics-fixed code
}
//==========
// UTILS
//==========

function addCommas(nStr){
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	
	while (rgx.test(x1))
	{
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	
	return x1 + x2;
}