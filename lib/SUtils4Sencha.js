/**
 * Clase con utilidades comunes con sencha Touch.
 * Antes de llamar a cualquier método de esta clase debe inicar el nombre de la aplicación actual usando el método setAppName.
 * Ejemplo:
 *
 *
 * 		SUtils4Sencha.setAppName("ccsen1click");
 *
 * 		//Tambien es recomendable indicar el nombre del modelo a usar con el método setDefaultLocalModel. Ejemplo:
 * 		SUtils4Sencha.setDefaultLocalModel( "LocalStoreModel" );
 *
 *
 * @author rbruno <robert.bruno@sigis.com.ve>
 * @copyright (c) 2015 Copyright SIGIS Soluciones Integrales GIS, C.A.
 * @class SUtils4Sencha
 * @module Lib
 * */
SUtils4Sencha = {

	/**
     * Listeners de la aplicación
     *
     * @property {array} _listeners
     * @acces private
     */
    _listeners : new Array(),

	/**
	 * Nombre de la aplicación actual
	 */
	_appName : "",

	/**
	 * Nombre por defecto del modelo a usar para almacenar datos locales de la aplicación
	 *
	 * @property {String} _defaultLocalModel
	 * @default localData
	 * @access private
	 */
	_defaultLocalModel : "LocalData",

	/**
	 * indica el nombre de la aplicación
	 *
	 * @method setAppName
	 * @param name
	 */
	setAppName : function(name){
		this._appName = name;
	},

	/**
	 * indica el modelo por defecto para gusrdar los datos en el localstore
	 *
	 * @method setDefaultLocalModel
	 * @param modelName
	 */
	setDefaultLocalModel : function(modelName){
		this._defaultLocalModel = modelName ? modelName : this._appName+".model.LocalData";
	},

	/**
	 * Obtiene el nombre del modelo por defecto usado para almacenar los datos de forma local
	 *
	 * @method getDefaultLocalModel
	 */
	getDefaultLocalModel : function(){
		return this._defaultLocalModel;
	},

	/**
	 * Accede a las funciones nativas para compartir
	 * Esta funcionalidad hace uso del plugin de Apcahe Cordova. Para mayor información visite:
	 *
	 * <a href="https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin">
	 * https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
	 * </a>
	 *
	 * Para usar esta funcionalidad es necesario que instale el plugin en Apache cordova:<br/>
	 *
	 * 	$ cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
	 *
	 *
	 * @method share
	 *
	 */
	share : function(){
		if(window.plugins){
			if(window.plugins.socialsharing){
				var plugin = window.plugins.socialsharing;
				plugin.share.apply(plugin, arguments);
			}
		}else{
			var result = "";
			console.log("share",arguments);
			for ( var i = 0; i < arguments.length; i++) {
				result +=" "+arguments[i];
			}
			alert("Compartir " +result);
		}
	},

	/**
	 * Permite obtener una imagen de la camara ao de la galeria del dispositivo.
	 * Esta funcionalidad hace uso de un plugin de apache cordova. Para mayor información visite:
	 *
	 * <a href="https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md">
	 * https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md
	 * </a>
	 *
	 * Para usar esta funcionalidad es necesario que instale el plugin en Apache cordova:<br/>
	 *
	 * 	$ cordova plugin add org.apache.cordova.camera
	 *
	 *
	 * @method getPicture
	 */
	getPicture : function(){
		if(window.navigator){
			if(window.navigator.camera){
				var plugin = window.navigator.camera;
				plugin.getPicture.apply(plugin, arguments);
			}
		}else{
			console.log("getPicture",arguments);
		}
	},

	/**
	 *
	 * @method  sendSMS
	 */
	sendSMS : function(phoneNumber, textMessage, callback){

		if(window.sms){
			var messageInfo = {
					"phoneNumber": phoneNumber,
					"textMessage" : textMessage
				};

				sms.sendMessage(messageInfo, function(message) {
					callback && callback(message, false);
				}, function(error) {
					callback && callback(null, error.message);
				});
		}else{
			callback && callback(null, {message : "SMS Plugin not found"});
		}
	},

	/**
	 * Lee los datos almacenados localmente
	 *
	 * Ej.:
	 *
	 * 		var vehiculos = SUtils4Sencha.getLocalData("vehiculos", "myapp.model.User");
	 *
	 * @method getLocalData
	 * @param {string} field nombre del campo en el localstore. en caso de ser null retorna todos
	 * @param {String} El modelo a usar
	 * @return retorna los datos del usuario autenticado si es nulo se asume que no hay usuario autenticado
	 *
	 */
	getLocalData : function(field, model){
		var me = this;
		var data = null;

		if(!model){
			model =  this.getDefaultLocalModel();
		}

		try {

			var store = me.getLocalStore(model);

			if(store){
				var count = store && store.getCount() >   0 ;
				if(count){
					data = store.getAt(0).getData();
					if(field){
						return data[field];
					}
				}
			}

		} catch (e) {
			var fields = "";
			for ( var field in data) {fields += " , "+ field;}
			console.log("Error leyendo "+fields+" del localstore. "+e);
		}

		return data;
	},

	/**
	 * Obtiene el localstore usado para guardar los datos del usuario en la aplicación
	 *
	 * Ej.:
	 *
	 * 		var store =  SUtils4Sencha.getLocalStore("myapp.model.DatosLocales");
	 *
	 * @method getLocalStore
	 * @param {String} El modelo a usar
	 */
	getLocalStore : function(model){
		var localStore = null;

		if(!model){
			model =  this.getDefaultLocalModel();
		}

		localStore = Ext.create('Ext.data.Store',{model: model});

		try {
			localStore.load();
		} catch (e) {
			console.log("Error al cargar datos del localstore. "+e);
		}

		return localStore;
	},

	/**
	 * Establece los datos del usuario autenticado en la aplicación
	 *
	 * Ej.:
	 * 			var response =  new Array();
	 * 			...
	 *  		SUtils4Sencha.setLocalData({vehiculos: response}, "myapp.model.Vehiculos");
	 *  		...
	 * @method setLocalData
	 * @param {object} data datos a almacenar
	 * @param {String} El modelo a usar
	 */
	setLocalData : function(data, model){
		var store = null;

		if(!model){
			model =  this.getDefaultLocalModel();
		}

		store = this.getLocalStore();

		if(data && store){
			try {
				if( store.getCount() >   0 ){
					for ( var field in data) {
						store.getAt(0).set(field, data[field]);
					}
					store.getAt(0).setDirty();
				}else{
					var record = Ext.create(model, data);
					store.add(record);
				}
				store.sync();
			}catch (e) {
				var fields = "";
				for ( var field in data) {fields += " , "+ field;}
				console.log("setLocalData - Error guadando "+fields+" en el localstore. "+e);
			}
		}
	},

	/**
	 * Elimina los datos almacenaddos en el localstore del modelo indicado
	 *
	 * Ej.:
	 *
	 * 		SUtils4Sencha.clearLocalData("app.model.MyModel");
	 *
	 * @method clearLocalData
	 * @param {Object} model Modelo a usar
	 */
	clearLocalData : function(model){
		var store =  this.getLocalStore(model);
		if( store){
			store.removeAll();
			store.sync();
		}
	},

    /**
     * Valida si hay conexión de datos en el dispositivo
     *
     * Ej.:
     *
     * <code>
     * 		if(App.checkConnection()){
     * 				console.log("Hay conexión de datos");
     * 		}else{
     * 				console.log("No hay conexión de datos");
     * 		}
     * </code>
     *
     * @method checkConnection
     * @return {boolean}
     */
    checkConnection : function (){

	    if(navigator.connection){
	    	var networkState = navigator.connection.type;
	    	var states = {};

	    	if( typeof window.Connection != "undefined"){
	    		states[Connection.UNKNOWN]  = 'Unknown connection';
			    states[Connection.ETHERNET] = 'Ethernet connection';
			    states[Connection.WIFI]     = 'WiFi connection';
			    states[Connection.CELL_2G]  = 'Cell 2G connection';
			    states[Connection.CELL_3G]  = 'Cell 3G connection';
			    states[Connection.CELL_4G]  = 'Cell 4G connection';
			    states[Connection.CELL]     = 'Cell generic connection';
			    states[Connection.NONE]     = 'No network connection';
			    SUtils.log('networkState: ' + networkState);
			    SUtils.log('Connection type: ' + states[networkState]);

			    if(networkState==Connection.NONE ||  !networkState){
			    	return false;
			    }
	    	}
	    }

    	return true;
    },

    /**
     * Muestra un mensaje de alerta al usuario.
     * El diálogo usado será nativo según la plataforma en la que se este ejecutando la aplicación
     *
     * Ej.:
     * <code>
     * 		App.alert("Bienvenido!");
     * </code>
     *
     * @method alert
     * @param {String} msg
     */
    alert : function(msg){

    	if(navigator.notification){
    		navigator.notification.alert(msg,null,
    			    SGlobalize.translate("alerta"),
    			    SGlobalize.translate("aceptar")
    			);
    	}else{
    		alert(msg);
    	}
    },

    /**
     * Muestra un mensaje de confirmación al usuario.
     * El diálogo usado será nativo según la plataforma en la que se este ejecutando la aplicación
     *
     * Ej.:
     * <code>
     * 		App.confirm("Esta seguro ?", function(){
     * 				console.log("Elemento eliminado");
     * 		});
     * </code>
     * @method confirm
     * @param {String} msg
     * @param {function} onConfirm acción a ejecutar si el usuario confirma
     * @param {String} label de los botones separados por ','
     */
    confirm : function(msg, onConfirm, onCancel, buttons, title){
    	if(navigator.notification){
    		if(buttons){
    			navigator.notification.confirm(
    					msg,
    					function(buttonIndex){
    						if(buttonIndex==1 && onConfirm) onConfirm();
    						if(buttonIndex==2 && onCancel) onCancel();
    					},
    					title || "Confirmar",
    					buttons
    			);
    		}else{
    			navigator.notification.confirm(
    					msg,
    					function(buttonIndex){
    						if(buttonIndex==1 && onConfirm) onConfirm();
    						if(buttonIndex==2 && onCancel) onCancel();
    					},
    					'Confirmar',
    					'Aceptar,Cancelar'
    			);
    		}
    	}else if( confirm(msg) ){
   			if(onConfirm) onConfirm();
    	}

    	return true;
    },

    /**
     * Retorna un identificador único para el dispositivo en el que se esta ejecutando
     * la aplicación
     *
     * @method     getDeviceUuid
     * @retrun {string}
     */
    getDeviceUuid : function(){

    	if(window['device']){
    		var dev = {};
    		dev['Name'] = device.name;
            //dev['DeviceCordova'] = device.cordova;
            dev['Platform'] = device.platform;
            dev['UUID'] =  device.uuid;
            dev['Model'] = device.model;
            dev['Version'] = device.version;
            dev = JSON.stringify(dev);
    		console.log(dev);
    		return dev;
    	}else{
    		return JSON.stringify(Ext.os);
    	}
    },
    /**
	 * Obtiene campos desde la raiz de la respuesta obtenida tras una petición
	 * enviada por un store.
	 *
	 * @param store
	 */
	accessorFromStore : function(store, field){
		var proxy  = store.getProxy();

		if(proxy){
			var reader = proxy.getReader();
			if(reader){
				var accessor =  reader.createAccessor(field);
				if(accessor){
					return accessor(reader.rawData);
				}
			}
		}

		return null;
	},

	/**
	 * Convierte un array de Records a un array de objetos con los valoes de cada record.
	 * Ejemplo:<br/>
	 *
	 * 		list.store.on ("load", function(store , records,  success,  operation, eOpts){
	 *				var data = SUtils4Sencha.recordsToArrayObjects( records );
	 *				console.log(data);
     *		});
	 *
	 * @method recordsToArrayObjects
	 * @param {array} records
	 * @param {array} toDelete listado de campos a eliminar
	 * @return array
	 */
	recordsToArrayObjects : function(records, toDelete){
		var objects = new Array();

		if(records.length > 0){
			for ( var i = 0; i < records.length; i++) {
				var recordData  = records[i].getData(true);
				var obj = {};

				if(toDelete && toDelete.length){
					for ( var j = 0; j < toDelete.length; j++) {

						for ( var prop in recordData) {
							if(prop != toDelete[j]){
								obj[prop] = recordData[prop];
							}
						}
					}
				}else{
					obj = recordData;
				}

				objects.push(obj);
			}
		}

		return objects;
	},
	/**
	 * Retorna la traducción de la cadena indicada. Este método es un alias para
	 * SGlobalize.translate("").
	 *
	 * Ej.<br/>
	 *
	 * 		SUtils4Sencha.t("btn_acept");
	 *
	 *
	 * @method t
	 */
	t : function(key){
		return SGlobalize.translate(key);
	},
	/**
	 * Obtiene los parámetros de la URL
	 *
	 * @method getUrlParams
	 */
	getUrlParams : function(){
		var urlsplit = document.URL.split("?");
		return  Ext.urlDecode(urlsplit[urlsplit.length - 1]);
	},

	 /**
	 * Establece las credencinales de autenticación
	 *
	 * @method makeWSBaseAuth
	 */
	makeWSBaseAuth : function () {
		if(Config.WSUser && Config.WSPass){
			var tok = Config.WSUser + ':' + Config.WSPass;
			var hash = btoa(tok);
			Ext.Ajax.setDefaultHeaders({"Authorization" : "Basic " + hash});
		}
	},
	/**
	 * Muestra un panel modal sobre el Viewport. Es importante que se mantenga solo un panel modal visible en su aplicación
	 * para poder manejar el evento back de los dispositivos. Adicionalmente dicho panel debe ser cerraod con el método
	 * hideModalPanel.
	 *
	 * ej.:
	 *
	 * 		var dlg =  Ext.create("Ext.panel",{
	 * 			html: 'Saludos!'
	 * 		});
	 *
	 * 		App.extFn().showOverlay(dlg); //Se usa App.extFn() como alias para SUtils4Sencha
	 * 		App.extFn().hideOverlay();
	 *
	 *
	 * @method showOverlay
	 * @param {object} _panel Panel a mostrar en el overlay
	 */
    showOverlay : function(_panel){
    	 var me = this;
    	 me._overlay = _panel;
         Ext.Viewport.add(me._overlay);
         me._overlay.on("hide", function(){
        	 me._overlay = null;
         });
	     me._overlay.show();
	},

	/**
	 * Indica si hay un panel overlay visible
	 *
	 * @method hasOverlay
	 * @return {boolean}
	 */
	hasOverlay : function(){
		return this._overlay ? true : false;
	},

	/**
	 * Acción ejecutada para cerrar panel modal que este visible en el momento
	 *
	 * @method hideOverla
	 */
	hideOverlay : function(){
		var me = this;

		if(me._overlay){
			me._overlay.hide();
		}

		me._overlay = null;
	},

	  /**
     * Dispara la acción de llamar a un número de teléfono
     *
     * Ej.:
     *
     * <code>
     * App.callNumberPhone("+582129541193");
     * </code>
     *
     * @method callNumberPhone
     * @param {Number} number número de teléfono a donde se desea disparar la llamada
     */
    callNumberPhone : function(number){
    	var isPhone = Ext.os.deviceType == 'Phone';

    	if(isPhone){
    		window.location.href="tel:"+number;
    	}else{
    		this.alert("Puede comunicarse a través del teléfono\n " + number);
    	}

    	App.extFn().fireAppEvent("callnumberphone", number);
    },
    /**
	 * Agrega un listener de eventos a la aplicación
	 *
	 * @method addAppListener
	 * @param eventName nombre del evento
	 * @param eventAction acción a ajecutar cuanmdo se dispare el evento. si la acción retorna true se detiene la propagación del evento.
	 * @param scope ambito o conexto en el que se ejecuta la acción
	 */
	addAppListener : function(eventName, eventAction, scope){
		this._listeners.push({
			name : eventName,
			action : eventAction,
			scope  : scope
		});
	},

	/**
	 * Elimina n listener de eventos a la aplicación
	 *
	 * @method removeAppListener
	 * @param eventName nombre del evento
	 * @param eventAction acción que se asigno al evento
	 */
	removeAppListener : function(eventName, eventAction){
		for ( var i = 0; i < this._listeners.length; i++){
			if( this._listeners[i].name ==  eventName &&
				this._listeners[i].action == eventAction ){
				this._listeners.splice(i,1);
				return;
			}
		}

		 console.log("this._listeners",this._listeners);
	},

	/**
	 * Dispara un evento
	 *
	 * @method fireAppEvent
	 * @param eventName
	 * @param {array} data datos que se desean pasar junto con el evento
	 */
	fireAppEvent : function(eventName, data){
		for ( var i = 0; i < this._listeners.length; i++){
			if( this._listeners[i].name ==  eventName){
				if(this._listeners[i].action != undefined){
					var scope = this._listeners[i].scope;
					var stopPropagation = this._listeners[i].action.call(scope,data);

					if (stopPropagation == true){
						return;
					}
				}
			}
		}
	},

	/**
	 * Abre una ventana usando el plugin inadpp browser.
	 *
	 * @method 	openWindow
	 */
	openWindow : function(url, target, options){
		var ref = null;

		if(cordova &&  cordova.InAppBrowser){
			ref = cordova.InAppBrowser.open(url, target, options);
			SUtils.log(["cordova.InAppBrowser.open", url, target, options]);
		}else{
			ref = window.open(url, target, options);
			SUtils.log(["window.open", url, target]);
		}

		return ref;
	}
};
