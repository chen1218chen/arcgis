<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	//response.setHeader("Access-Control-Allow-Origin", "*");
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String esriPath = request.getServerName() + ":" + request.getServerPort() + path + "/";
	/* out.println(esriPath); */
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<base href="<%=basePath%>">
<title>arcgisDemo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="arcgis_js_api/library/3.13/3.13/dijit/themes/claro/claro.css">
<link rel="stylesheet" href="arcgis_js_api/library/3.13/3.13/esri/css/esri.css">
<link rel="stylesheet" href="css/main.css">
<script type="text/javascript">
	var arcgis_js_api_home = "<%=esriPath%>";
	var dojoConfig = {
		has : {
			"dojo-firebug" : true
		},
		async : true,
		paths : {
			"js" : "/../js"
		},
	};
</script>
<script src="arcgis_js_api/library/3.13/3.13/init.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</head>
<body>
<div id="content"
     data-dojo-type="dijit/layout/BorderContainer"
     data-dojo-props="design:'headline', gutters:true"
     style="width: 100%; height: 100%; margin: 0;">

  <div id="rightPane"
       data-dojo-type="dijit/layout/ContentPane"
       data-dojo-props="region:'right'">

    <div data-dojo-type="dijit/layout/AccordionContainer">
      <div data-dojo-type="dijit/layout/ContentPane" id="legendPane"
           data-dojo-props="title:'Legend', selected:true">
        <div id="legendDiv"></div>
      </div>
      <div data-dojo-type="dijit/layout/ContentPane"
           data-dojo-props="title:'Pane 2'">
        This pane could contain tools or additional content
      </div>
    </div>
  </div>
  <div id="arcgisDiv"
       data-dojo-type="dijit/layout/ContentPane"
       data-dojo-props="region:'center'"
       style="overflow:hidden;">
  </div>
</div>
<!-- 	<div id="arcgisDiv"></div> -->
</body>
</html>
