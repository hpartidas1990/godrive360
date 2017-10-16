/**
 * 
 * 
 */
Ext.define('app.controller.Course', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.course.Panel',
		'app.view.course.saveCourseView',
		'app.view.course.markErrorFormPanel'
	],
	
	config: {
		
		refs: {
			mainView: '#main',
			recordBtn: 'course-panel #recordBtn',
			
			markErrorBtn : 'save-course-panel #markErrorBtn',
			endRecordingBtn : 'save-course-panel #endRecordingBtn',
			
			sendErrorBtn : '#btnSendError',
			resumeCourseBtn : 'save-course-panel #resumeCourseBtn',
			
			errorTextfield : 'markerror-form-panel panel fieldset textareafield'
		},
		
		control: {
			recordBtn : {
				tap: 'onRecordBtnTap'
			},
			
			markErrorBtn : {
				tap : 'onMarkErrorBtnTap'
			},
			
			endRecordingBtn : {
				tap : 'onEndRecordingBtnTap'
			},
			
			sendErrorBtn : {
				tap : 'onSendErrorBtnTap'
			},
			
			resumeCourseBtn : {
				tap : 'onResumeCourseBtnTap'
			}
		}
	},
	
	_currentRouteArray : [],
	
	getCurrentRouteArray : function(){
		return this._currentRouteArray;
	},
	
	setCurrentRouteArray : function(value){
		this._currentRouteArray = value;
	},
	
	_errorArray : [],
	
	getCurrentErrorArray : function(){
		return this._errorArray;
	},
	
	setCurrentErrorArray : function(value){
		this._errorArray = value;
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
				me.startRouteRecording();
	},
	
	/**
	 * @method startRouteRecording
	 */
	startRouteRecording : function(){
		
		SUtils.log("init recording");
		
		var me = this;
		var main = me.getMainView();
		var geo = App.getController("Geolocation");
		var captureSuccess = function(mediaFiles) {
			main.setMasked(false);
			me.push(Ext.create('save-course-panel', {
				title: 'Recorrido Detenido',
				data: {
					videoInfo : (mediaFiles) ? mediaFiles : null
				}
			}));
			console.log(mediaFiles);			
		};
		
		var captureError = function(error) {
			main.setMasked(false);
		    App.extFn().alert('Error code: ' + error.code, null, 'Capture Error');
		};	
		
			App.extFn().setLocalData({'current_route_start_timestamp': moment().format()});
			me._captureActive = true;
			main.setMasked({
	            xtype: 'loadmask',
	            message: 'Inicializando...'
	        });
			
			geo.initPositionCapture();
		
			/**
			 * Se activa la camara para grabar, en desarrollo se comenta para pasar a la pantalla de 
			 * confirmación directamente. 
			setTimeout(function(){
				App.extFn().startRecording(captureSuccess, captureError);
			}, 200);*/
		
			//<-- Este bloque debe eliminarse al descomentar el de arriba
			main.setMasked(false);
			main.push(Ext.create('save-course-panel', {
				title: 'Recorrido Detenido',
				data: {
					//videoInfo : (mediaFiles) ? mediaFiles : null
				}
			}));
			//--> Fin del bloque
	},
	
	/**
	 * @method onSaveRecordingBtnTap
	 */
	onSaveRecordingBtnTap : function(){
		
		var me = this;
		
	},
	
	/**
	 * @method saveNewSegmentToRoute
	 */
	saveNewSegmentToRoute : function(newSegment){
		
		var me = this;
		var currentRoute = me.getCurrentRouteArray();
			currentRoute.push(newSegment);
			me.setCurrentRouteArray(currentRoute);
			
		var currentRoute = me.getCurrentRouteArray();
		var route = currentRoute.toString();
			
			App.extFn().setLocalData({'current_route': route});
	},
	
	/**
	 * @method onMarkErrorBtnTap
	 */
	onMarkErrorBtnTap : function(){
		var me = this;
		var main = me.getMainView();	
			main.add(me.getMarkErrorFormPanel());
	},
	
	/**
	 * @method saveNewError 
	 */
	getMarkErrorFormPanel : function(){
		
		return Ext.create('markerror-form-panel', {
			title : 'Marcar Error'
		});
	},

	/**
	 * @method onSendErrorBtnTap
	 */
	onSendErrorBtnTap : function(){
		
		var me = this;
		var errorTextfield = me.getErrorTextfield();
		var errorText = errorTextfield.getValue().trim();
		
		if(errorText != ''){
			me.addErrorToArray(errorText);
		}
	},
	
	/**
	 * Method that creates the new error object and adds it to the session error array
	 * 
	 * @method addErrorToArray
	 */
	addErrorToArray : function(errorTxt){
		
		var me = this;
		var errorArray = me.getCurrentErrorArray();
		var geo = App.getController("Geolocation");
		var newErrorObj = {
				desc   : errorTxt,
				time   : moment().format(),
				coords : geo.lastPosition
		}
		
		console.log(newErrorObj);
		errorArray.push(newErrorObj);
		
		me.setCurrentErrorArray(errorArray);
		App.setLocalData({'current_route_errors': errorArray});
	},
	
	/**
	 * @method onResumeCourseBtnTap
	 */
	onResumeCourseBtnTap : function(){
		
		var me = this;
		var main = me.getMainView();
		var captureSuccess = function(mediaFiles) {
			main.setMasked(false);
			me.push(Ext.create('save-course-panel', {
				title: 'Recorrido Detenido',
				data: {
					videoInfo : (mediaFiles) ? mediaFiles : null
				}
			}));
		};
		
		var captureError = function(error) {
			main.setMasked(false);
		    App.extFn().alert('Error code: ' + error.code, null, 'Capture Error');
		};
			main.pop();
			setTimeout(function(){
				App.extFn().startRecording(captureSuccess, captureError);
			}, 200);
			
	},
	
	/**
	 * @method onEndRecordingBtnTap 
	 */
	onEndRecordingBtnTap : function(){
		
		var me = this;
		var main = me.getMainView();
		var geo = App.getController("Geolocation");
		
		App.extFn().confirm("¿Está ud. seguro que quiere finalizar el recorrido ahora?", function(){
			App.extFn().setLocalData({'current_route_end_timestamp': moment().format()});
			me._captureActive = true;
			geo.stopPositionCapture();
			main.pop();
		});
	},
	
	clearSessionArrays : function(){
		//TODO limpiar todos los array que contienen data temporal no guardada.
		App.setLocalData({'current_route_start_timestamp': ''});
		App.setLocalData({'current_route': ''});
		App.setLocalData({'current_route_end_timestamp': ''});
		App.setLocalData({'current_route_errors': ''});
	}
	
});



