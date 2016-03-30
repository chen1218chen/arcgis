var map;
require([ "esri/map", "esri/layers/FeatureLayer", "esri/dijit/Legend",
		"dojo/_base/array", "dojo/parser", "dijit/layout/BorderContainer",
		"dijit/layout/ContentPane", "dijit/layout/AccordionContainer", ,
		"esri/layers/ArcGISDynamicMapServiceLayer", "esri/SpatialReference" ],
		function(Map, FeatureLayer, Legend,
			      arrayUtils, parser) {
			
			parser.parse();
			map = new Map("arcgisDiv", {
				logo : false,
				center : [ 107.55, 24.22 ],
				slider : true,
			});
			var baseUrl = "http://192.168.1.139:6080/arcgis/rest/services/";
			var mapNames = {
				"dt" : "dt" // 底图
				,
				"dw" : "dw"// 电网
			};
			var dtLayer = new esri.layers.ArcGISDynamicMapServiceLayer(baseUrl
					+ mapNames.dt + "/MapServer", {
				id : "dt"
			});
			// var layer1 = new
			// esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/WGS_84/MapServer");
			var dwLayer = new esri.layers.ArcGISDynamicMapServiceLayer(baseUrl
					+ mapNames.dw + "/MapServer", {
				id : "dw"
			});
			   var rivers = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/1", {
			        mode: FeatureLayer.MODE_ONDEMAND,
			        outFields:["*"]
			      });
			      var waterbodies = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/0", {
			        mode: FeatureLayer.MODE_ONDEMAND,
			        outFields:["*"]
			      });
			  //add the legend
		      map.on("layers-add-result", function (evt) {
		        var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
		          return {layer:layer.layer, title:layer.layer.name};
		        });
		        if (layerInfo.length > 0) {
		          var legendDijit = new Legend({
		            map: map,
		            layerInfos: layerInfo
		          }, "legendDiv");
		          legendDijit.startup();
		        }
		      });

//			map.addLayers([ dtLayer, dwLayer ]);
			  map.addLayers([waterbodies, rivers]);
			// map.addLayer(layer);
			map.setZoom(8);
		});