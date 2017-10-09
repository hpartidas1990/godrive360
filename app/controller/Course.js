/**
 * 
 * 
 */
Ext.define('app.controller.Course', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.course.Panel',
		'app.view.course.recorderView'
	],
	
	config: {
		
		refs: {
			mainView: '#main',
			recordBtn: '#recordBtn',
			stopRecordBtn: '#stopRecordBtn',
			errorBtn : '#errorBtn'
		},
		
		control: {
			recordBtn : {
				tap: 'onRecordBtnTap'
			},
			
			stopRecordBtn : {
				tap: 'onStopRecordBtnTap'
			},
			
			errorBtn : {
				tap: 'onErrorBtnTap'
			}
		}
	},
	
	_captureActive : false,
	
	_watcher : null,
	/**
	 * Acción que se ejecuta al tocar el botón recordBtn
	 * 
	 * @method onRecordBtnTap
	 */
	onRecordBtnTap : function(){
		
		var me = this;
		var main = me.getMainView();
		var onSuccess = function(position) {
			console.log("success");
	        console.log(position);
	    };
	    var onError = function onError(error) {
	    	console.log("error");
	        console.log(error);
	    };
			
			me._captureActive = true;
			main.setMasked({
	            xtype: 'loadmask',
	            message: 'Inicializando...'
	        });
			
			if(navigator && navigator.geolocation){
				me._watcher = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 30000 });
			}
		
			setTimeout(function(){
				main.push(Ext.create("recorder-view-panel", {
					title : 'Grabando'
				}));
			}, 1200);
			
			
	},
	/**
	 * 
	 */
	onStopRecordBtnTap : function(){
		
		SUtils.log("onStopRecordBtnTap");
		
		var me = this;
		var main = me.getMainView();
		
			/*main.setMasked({
	            xtype: 'loadmask',
	            message: 'Deteniendo...'
	        });*/
		
			App.extFn().confirm("Ha detenido la grabación. ¿Desea guardar el progreso?", function(){
				
				if(me._watcher && navigator && navigator.geolocation){
					navigator.geolocation.clearWatch(me._watcher);
					me._watcher = null;
				}
				
				me._captureActive = false;
				
			});
	},
	
	onErrorBtnTap : function(){
		console.log("Marcar error en el recorrido");
		App.extFn().alert("Marcar error en el recorrido");
	}
	
	
});



