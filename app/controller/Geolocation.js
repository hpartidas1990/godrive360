/**
 * 
 * 
 */
Ext.define('app.controller.Geolocation', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		
	],
	
	config: {
		
		refs: {
			mainView: '#main'
		},
		
		control: {
			
		}
	},
	
	lastPosition : null,
	
	_routeArray : [],
	
	getRouteArray : function(){
		return this._routeArray;
	},
	
	setRouteArray : function(value){
		this._routeArray = value;
	},
	
	_geolocator : null,
	
	initPositionCapture : function(){
		
		var me = this;
		var onSuccess = me.successAction();
		var onError = me.errorAction();
		
		if(navigator && navigator.geolocation){
			me._geolocator = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 30000 });
		}
	},
	
	stopPositionCapture : function(){
		
		var me = this;
		
		if(me._watcher && navigator && navigator.geolocation){
			navigator.geolocation.clearWatch(me._watcher);
			me._geolocator = null;
		}
		
	},
	
	successAction : function(){
		var me = this;
		return function(position) {
			console.log("Succeded position capture", position.coords);
	        me.addPointToRouteArray(position.coords);
	    };
	    
	},
	
	errorAction : function(){
	    
	    return function onError(error) {
	    	SUtils.log(["Error capturando la posición del dispositivo", error]);
	    };
	},
	
	addPointToRouteArray : function(point){
		
		var me = this;
		var route = me.getRouteArray();
			
			me.lastPosition = {
	        		accuracy : point.accuracy,
	        		lat: point.latitude,
	        		lng: point.longitude,
	        		time: moment().format()
	        };
			
			route.push(me.lastPosition);
			me.setRouteArray(route);
			
			App.extFn().setLocalData({'current_route_coords' : route});
	}
	
	
	
});



