require(["esri/map"
         ,"esri/layers/ArcGISDynamicMapServiceLayer"
         ,"esri/SpatialReference"
         ],function(){
	var map = new esri.Map("arcgisDiv",{
		logo : false,
		center: [107.55, 24.22],
		slider:true,
	});
	var baseUrl = "http://192.168.1.139:6080/arcgis/rest/services/";
	var mapNames ={
			"dt":"dt" //底图
			,"dw":"dw"//电网
		};
	var dtLayer = new esri.layers.ArcGISDynamicMapServiceLayer(baseUrl+mapNames.dt+"/MapServer",{id:"dt"});
//	var layer1 = new esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/WGS_84/MapServer");
	var dwLayer = new esri.layers.ArcGISDynamicMapServiceLayer(baseUrl+mapNames.dw+"/MapServer",{id:"dw"});
	map.addLayers([dtLayer,dwLayer]);
//	map.addLayer(layer);
	map.setZoom(8);
});