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
		
		return function(position) {
			console.log("success");
	        console.log(position);
	        
	        
	    };
	    
	},
	
	errorAction : function(){
	    
	    var onError = function onError(error) {
	    	console.log("error");
	        console.log(error);
	    };
	}
	
	
	
});



