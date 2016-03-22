// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
define("esri/SnappingManager","dojo/_base/declare dojo/_base/connect dojo/_base/lang dojo/_base/array dojo/_base/Color dojo/_base/Deferred dojo/has dojo/keys ./kernel ./graphic ./geometry/ScreenPoint ./geometry/Extent ./symbols/SimpleMarkerSymbol ./symbols/SimpleLineSymbol ./tasks/query".split(" "),function(w,e,t,x,C,I,D,E,J,K,F,u,G,H,v){w=w(null,{declaredClass:"esri.SnappingManager",constructor:function(a){a=a||{};a.map||console.error("map is not specified for SnappingManager");this.map=a.map;this.tolerance=
a.tolerance||15;this.layerInfos=[];if(a.layerInfos)this.layerInfos=a.layerInfos;else{var b;for(b=0;b<this.map.graphicsLayerIds.length;b++){var d=this.map.getLayer(this.map.graphicsLayerIds[b]);this.layerInfos.push({layer:d})}if(this.map.loaded)this.layerInfos.push({layer:this.map.graphics});else var m=e.connect(this.map,"onLoad",this,function(a){e.disconnect(m);m=null;this.layerInfos.push({layer:this.map.graphics});this.setLayerInfos(this.layerInfos)})}this.snapPointSymbol=a.snapPointSymbol?a.snapPointSymbol:
new G(G.STYLE_CROSS,15,new H(H.STYLE_SOLID,new C([0,255,255]),1),new C([0,255,0,0]));this.alwaysSnap=a.alwaysSnap?a.alwaysSnap:!1;this.snapKey=a.snapKey?a.snapKey:D("mac")?E.META:E.CTRL;this._SelectionLyrQuery=new v;this._SelectionLyrQuery.spatialRelationship=v.SPATIAL_REL_INTERSECTS;this._snappingGraphic=new K;this.setLayerInfos(this.layerInfos);this._currentGraphicOption={snapToPoint:!0,snapToVertex:!0,snapToEdge:!0};this._snappingCallback=t.hitch(this,this._snappingCallback)},getSnappingPoint:function(a){var b=
this.layers,d=this.tolerance,m=this.map,A=this.layerOptions,g=m.toMap(a.offset(-d,d)),d=m.toMap(a.offset(d,-d)),g=new u(g.x,g.y,d.x,d.y,m.spatialReference),r=new v;r.geometry=g;r.spatialRelationship=v.SPATIAL_REL_INTERSECTS;var n=[],k=[],e,B=this._extractPointsAndLines,y=new I,z=0,f,d=g.xmin,l=g.xmax;x.forEach(b,function(a,b){a.visible&&(a.loaded&&"esri.layers.FeatureLayer"===a.declaredClass&&a.mode!==a.constructor.MODE_SELECTION)&&z++});m.spatialReference._isWrappable()&&(d=u.prototype._normalizeX(g.xmin,
m.spatialReference._getInfo()).x,l=u.prototype._normalizeX(g.xmax,m.spatialReference._getInfo()).x);var h=new u(d,g.ymin,l,g.ymax,m.spatialReference);x.forEach(b,function(a,b){if("esri.layers.GraphicsLayer"===a.declaredClass&&a.visible){var d=[];x.forEach(a.graphics,function(a){a&&a.visible&&h.intersects(a.geometry)&&d.push(a)});var g=B(d,A[b]);n=n.concat(g[0]);k=k.concat(g[1])}});var c=t.hitch(this,function(b){z--;b instanceof Error?console.log("getSnappingPoint: query features failed"):(b=B(b.features,
A[f]),n=n.concat(b[0]),k=k.concat(b[1]));z||(e=this._getSnappingPoint(n,k,a),y.callback(e))}),p=!1;x.forEach(b,function(a,b){a.visible&&a.loaded&&(f=b,"esri.layers.FeatureLayer"===a.declaredClass&&a.mode!==a.constructor.MODE_SELECTION&&(p=!0,a.queryFeatures(r,c,c)))});p||(e=this._getSnappingPoint(n,k,a),y.callback(e));return y},setLayerInfos:function(a){this.layers=[];this.layerOptions=[];var b;for(b=0;b<a.length;b++)this.layers.push(a[b].layer),this.layerOptions.push({snapToPoint:!0,snapToVertex:!0,
snapToEdge:!0}),!1===a[b].snapToPoint&&(this.layerOptions[b].snapToPoint=a[b].snapToPoint),!1===a[b].snapToVertex&&(this.layerOptions[b].snapToVertex=a[b].snapToVertex),!1===a[b].snapToEdge&&(this.layerOptions[b].snapToEdge=a[b].snapToEdge);this._featurePtsFromSelectionLayer=[];this._featureLinesFromSelectionLayer=[];this._selectionLayers=[];this._selectionLayerOptions=[];x.forEach(this.layers,function(a,b){"esri.layers.FeatureLayer"===a.declaredClass&&a.mode===a.constructor.MODE_SELECTION&&(this._selectionLayers.push(a),
this._selectionLayerOptions.push(this.layerOptions[b]))},this);this.layerInfos=a},destroy:function(){e.disconnect(this._onExtentChangeConnect);this._killOffSnapping();this._featurePtsFromSelectionLayer=this._featureLinesFromSelectionLayer=this._currentFeaturePts=this._currentFeatureLines=this.layers=this.map=null},_startSelectionLayerQuery:function(){e.disconnect(this._onExtentChangeConnect);this._mapExtentChangeHandler(this._selectionLayers,this._selectionLayerOptions,this.map.extent);this._onExtentChangeConnect=
e.connect(this.map,"onExtentChange",t.hitch(this,"_mapExtentChangeHandler",this._selectionLayers,this._selectionLayerOptions))},_stopSelectionLayerQuery:function(){e.disconnect(this._onExtentChangeConnect)},_mapExtentChangeHandler:function(a,b,d){this._featurePtsFromSelectionLayer=[];this._featureLinesFromSelectionLayer=[];var m;this._SelectionLyrQuery.geometry=d;var e=t.hitch(this,function(a){a instanceof Error?console.log("getSnappingPoint: query features failed"):(a=this._extractPointsAndLines(a.features,
b[m]),this._featurePtsFromSelectionLayer=this._featurePtsFromSelectionLayer.concat(a[0]),this._featureLinesFromSelectionLayer=this._featureLinesFromSelectionLayer.concat(a[1]))});x.forEach(a,function(a,b){a.visible&&a.loaded&&(m=b,a.queryFeatures(this._SelectionLyrQuery,e,e))},this)},_extractPointsAndLines:function(a,b){var d=[],m=[],e,g;x.forEach(a,function(a,n){if((!a._graphicsLayer||a.visible)&&a.geometry)if("point"===a.geometry.type&&b.snapToPoint)d.push(a.geometry);else if("polyline"===a.geometry.type)for(e=
0;e<a.geometry.paths.length;e++){m.push("lineStart");for(g=0;g<a.geometry.paths[e].length;g++){var k=a.geometry.getPoint(e,g);b.snapToVertex&&d.push(k);b.snapToEdge&&m.push(k)}m.push("lineEnd")}else if("polygon"===a.geometry.type)for(e=0;e<a.geometry.rings.length;e++){m.push("lineStart");for(g=0;g<a.geometry.rings[e].length;g++)k=a.geometry.getPoint(e,g),b.snapToVertex&&d.push(k),b.snapToEdge&&m.push(k);m.push("lineEnd")}});return[d,m]},_getSnappingPoint:function(a,b,d){var e,A,g=this.tolerance,r=
this.map,n=this.map._getFrameWidth();a=a.concat(this._featurePtsFromSelectionLayer);b=b.concat(this._featureLinesFromSelectionLayer);if(this._currentGraphic){var k=this._extractPointsAndLines([this._currentGraphic],this._currentGraphicOption);a=a.concat(k[0]);b=b.concat(k[1])}var w,B;x.forEach(a,function(a,b){var c=r.toScreen(a,!0);if(-1!==n&&(c.x%=n,0>c.x&&(c.x+=n),r.width>n))for(var f=(r.width-n)/2;c.x<f;)c.x+=n;e=Math.sqrt((c.x-d.x)*(c.x-d.x)+(c.y-d.y)*(c.y-d.y));e<=g&&(g=e,w=c.x,B=c.y)});if(w)b=
new F(w,B),A=b=r.toMap(b);else{var y,z,g=this.tolerance;for(a=0;a<b.length;a++)if("lineStart"===b[a])for(k=a+1;k<b.length;k++){if("lineEnd"!==b[k+1]&&"lineStart"!==b[k+1]&&"lineEnd"!==b[k]&&"lineStart"!==b[k]){var f=r.toScreen(b[k],!0),l=r.toScreen(b[k+1],!0),h=f.x>=l.x?f:l,c=f.x>=l.x?l:f;-1!==n&&(h.x%=n,0>h.x&&(h.x+=n),c.x%=n,0>c.x&&(c.x+=n),c.x>h.x&&(c.x-=n));var f=h.x,h=h.y,l=c.x,c=c.y,p,q,s,t,u,v;f===l?(p=f,q=d.y,s=t=f,u=h<=c?h:c,v=h<=c?c:h):h===c?(p=d.x,q=h,s=f<=l?f:l,t=f<=l?l:f,u=v=h):(q=(c-
h)/(l-f),s=(h*l-f*c)/(l-f),p=(s-(d.y*c-d.y*h-d.x*f+d.x*l)/(c-h))/((f-l)/(c-h)-q),q=q*p+s,s=f<=l?f:l,t=f<=l?l:f,u=h<=c?h:c,v=h<=c?c:h);p>=s&&p<=t&&q>=u&&q<=v?(f=Math.sqrt((d.x-p)*(d.x-p)+(d.y-q)*(d.y-q)),f<=g&&(g=f,y=p,z=q)):(p=Math.sqrt((f-d.x)*(f-d.x)+(h-d.y)*(h-d.y)),q=Math.sqrt((l-d.x)*(l-d.x)+(c-d.y)*(c-d.y)),p<=q?(s=p,p=f,q=h):(s=q,p=l,q=c),s<=g&&(g=s,y=p,z=q))}if("lineEnd"===b[k]){a=k;break}}y&&(b=new F(y,z),A=b=r.toMap(b))}return A},_setGraphic:function(a){this._currentGraphic=a},_addSnappingPointGraphic:function(){var a=
this.map;this._snappingGraphic.setSymbol(this.snapPointSymbol);a.graphics.add(this._snappingGraphic)},_setUpSnapping:function(){var a=this.map;this._onSnapKeyDown_connect=e.connect(a,"onKeyDown",this,"_onSnapKeyDownHandler");this._onSnapKeyUp_connect=e.connect(a,"onKeyUp",this,"_onSnapKeyUpHandler");this._onSnappingMouseMove_connect=e.connect(a,"onMouseMove",this,"_onSnappingMouseMoveHandler");this._onSnappingMouseDrag_connect=e.connect(a,"onMouseDrag",this,"_onSnappingMouseMoveHandler");this.alwaysSnap&&
this._activateSnapping()},_killOffSnapping:function(){e.disconnect(this._onSnapKeyDown_connect);e.disconnect(this._onSnapKeyUp_connect);e.disconnect(this._onSnappingMouseMove_connect);e.disconnect(this._onSnappingMouseDrag_connect);this._deactivateSnapping()},_onSnapKeyDownHandler:function(a){a.keyCode===this.snapKey&&(e.disconnect(this._onSnapKeyDown_connect),this.alwaysSnap?this._deactivateSnapping():this._activateSnapping())},_activateSnapping:function(){this._snappingActive=!0;this._addSnappingPointGraphic();
this._currentLocation&&this._onSnappingMouseMoveHandler(this._currentLocation)},_onSnapKeyUpHandler:function(a){a.keyCode===this.snapKey&&(this._onSnapKeyDown_connect=e.connect(this.map,"onKeyDown",this,"_onSnapKeyDownHandler"),this.alwaysSnap?this._activateSnapping():this._deactivateSnapping())},_deactivateSnapping:function(){this._snappingActive=!1;this._snappingPoint=null;this.map.graphics.remove(this._snappingGraphic);this._snappingGraphic.setGeometry(null)},_onSnappingMouseMoveHandler:function(a){this._currentLocation=
a;this._snappingPoint=null;this._snappingActive&&(this._snappingGraphic.hide(),this.getSnappingPoint(a.screenPoint).addCallback(this._snappingCallback))},_snappingCallback:function(a){if(this._snappingPoint=a)this._snappingGraphic.show(),this._snappingGraphic.setGeometry(a)}});D("extend-esri")&&(J.SnappingManager=w);return w});