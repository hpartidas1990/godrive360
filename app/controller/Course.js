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
			stopRecordBtn: '#stopRecordBtn'
		},
		
		control: {
			recordBtn : {
				tap: 'onRecordBtnTap'
			},
			
			stopRecordBtn : {
				tap: 'onStopRecordBtnTap'
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
		var geo = App.getController("Geolocation");
			
			me._captureActive = true;
			main.setMasked({
	            xtype: 'loadmask',
	            message: 'Inicializando...'
	        });
			
			geo.initPositionCapture();
		
			setTimeout(function(){
				App.extFn().startRecording();
			}, 200);
			
			
	},
	/**
	 * 
	 */
	onStopRecordBtnTap : function(){
		
		SUtils.log("onStopRecordBtnTap");
		
		var me = this;
		var main = me.getMainView();
		var geo = App.getController("Geolocation");
		
			main.setMasked({
	            xtype: 'loadmask',
	            message: 'Deteniendo...'
	        });
		
			App.extFn().confirm("Ha detenido la grabación. ¿Desea guardar el progreso?", function(){
				
				geo.stopPositionCapture();
				
				me._captureActive = false;
				
			});
	}
	
	
});



