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
	
	_selectedPupil : 1,
	
	getSelectedPupil : function(){
		return this._selectedPupil;
	},
	
	setSelectedPupil : function(value){
		this._selectedPupil = value;
	},
	
	_savedRoutes : [],
	
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
		
		SUtils.log("startRouteRecording");
		
		var me = this;
		var main = me.getMainView();
		var geo = App.getController("Geolocation");
		var captureSuccess = function(mediaFiles) {

			if(mediaFiles[0] != null){
				me.saveNewSegmentToRoute(mediaFiles[0]);
				
				main.setMasked(false);
				main.push(Ext.create('save-course-panel', {
					title: 'Recorrido Detenido',
					data: {
						videoInfo : (mediaFiles[0]) ? mediaFiles[0] : null
					}
				}));
			}
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
			 * confirmación directamente. */
			setTimeout(function(){
				App.extFn().startRecording(captureSuccess, captureError);
			}, 200);
			
			
			/*/<-- Este bloque debe eliminarse al descomentar el de arriba
			main.setMasked(false);
			main.push(Ext.create('save-course-panel', {
				title: 'Recorrido Detenido',
				data: {
					//videoInfo : (mediaFiles) ? mediaFiles : null
				}
			}));
			--> Fin del bloque*/
	},
	
	/**
	 * @method saveNewSegmentToRoute
	 */
	saveNewSegmentToRoute : function(newSegment){
		
		var me = this;
		var currentRoute = me.getCurrentRouteArray();
			currentRoute.push(newSegment);
			me.setCurrentRouteArray(currentRoute);
			
			App.extFn().setLocalData({'current_route': me.getCurrentRouteArray()});
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
		var main = me.getMainView();
		var errorTextfield = me.getErrorTextfield();
		var errorText = errorTextfield.getValue().trim();
		
			main.setMasked({
	            xtype: 'loadmask',
	            message: 'Enviando...'
	        });
		
			if(errorText != ''){
				setTimeout(function(){
					me.addErrorToArray(errorText);
				}, 800);
			}
	},
	
	/**
	 * Method that creates the new error object and adds it to the session error array
	 * 
	 * @method addErrorToArray
	 */
	addErrorToArray : function(errorTxt){
		
		var me = this;
		var main = me.getMainView();
		var errorArray = me.getCurrentErrorArray();
		var geo = App.getController("Geolocation");
		var coords = geo.lastPosition;
		var newErrorObj = {
				desc   : errorTxt,
				time   : moment().format(),
				coords : {
					lat : (coords && coords.lat) ? coords.lat : '',
					lng : (coords && coords.lng) ? coords.lng : ''
				}
		}
		
		try {
			errorArray.push(newErrorObj);
			me.setCurrentErrorArray(errorArray);
			App.extFn().setLocalData({'current_route_errors': errorArray});
			App.extFn().alert('Se ha registrado el error con éxito');
			
			main.setMasked(false);
			main.pop();
			
		}catch(err){
			SUtils.log('Ha ocurrido un error, intente nuevamente - Error: ' + err);
			main.setMasked(false);
		}
	},
	
	/**
	 * @method onResumeCourseBtnTap
	 */
	onResumeCourseBtnTap : function(){
		
		var me = this;
		var main = me.getMainView();
		var captureSuccess = function(mediaFiles) {
			
			if(mediaFiles[0] != null){
				me.saveNewSegmentToRoute(mediaFiles[0]);
				
				main.setMasked(false);
				main.push(Ext.create('save-course-panel', {
					title: 'Recorrido Detenido',
					data: {
						videoInfo : (mediaFiles[0]) ? mediaFiles[0] : null
					}
				}));
			}
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
			
			App.extFn().confirm("¿Desea guardar su recorrido? De lo contrario los datos se perderán", function(){
				me.saveCurrentRoute();
			});
			
			main.pop();
		});
	},
	
	/**
	 * A method to save the current route 
	 * 
	 * @method saveCurrentRoute
	 */
	saveCurrentRoute : function(){

		var me = this;
		var savedData = App.extFn().getLocalData('saved_routes');
		var pupil = me.getSelectedPupil();
		var start = App.extFn().getLocalData('current_route_start_timestamp');
		var end = App.extFn().getLocalData('current_route_end_timestamp');
		var current_route_errors = (App.extFn().getLocalData('current_route_errors')) ? App.extFn().getLocalData('current_route_errors') : '';
		var route_files = (App.extFn().getLocalData('current_route')) ? App.extFn().getLocalData('current_route') : '';
		var route_coords = (App.extFn().getLocalData('current_route_coords')) ? App.extFn().getLocalData('current_route_coords') : '';
		var current_id = App.extFn().getLocalData('current_route_id');
			current_id = current_id + 1;
		
		var routeObj = {
				id : current_id,
				pupil : pupil,
				route_start_timestamp : start,
				route_end_timestamp : end,
				route_files  : route_files,
				route_coords : route_coords,
				route_errors : current_route_errors
		};
		
		savedData.push(routeObj);
		SUtils.log("Saving progress...");
		
		App.extFn().setLocalData({'saved_routes' : savedData});
		App.extFn().setLocalData({'current_route_id' : current_id});
		me.clearCurrentRouteData();
		
		App.extFn().alert('¡La ruta ha sido guardada correctamente!');
	},
	
	clearCurrentRouteData : function(){
		//TODO limpiar todos los array que contienen data temporal no guardada.
		App.extFn().setLocalData({'current_route_start_timestamp': ''});
		App.extFn().setLocalData({'current_route': ''});
		App.extFn().setLocalData({'current_route_end_timestamp': ''});
		App.extFn().setLocalData({'current_route_coords' : ''});
		App.extFn().setLocalData({'current_route_errors': ''});
	}
	
});



