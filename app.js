/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'app',

    requires: [
    	'Ext.data.identifier.Uuid',
    	'app.model.LocalData',
    	'Ext.data.Store',
        'Ext.data.proxy.LocalStorage',
        'app.view.user.LoginPanel',
        'app.view.Main'
    ],

    controllers: [
    	'app.controller.User',
    	'app.controller.Options',
    	'app.controller.Geolocation',
    	'app.controller.Course',
    	'app.controller.Pupils'
    ],
    
    views: ['Main'],
    
    /**
     * Prepara los componentes de la aplicación
     *
     * @method init
     */

    launch: function() {
    	var me = this;
    	window.App = me;
        Ext.fly('appLoadingIndicator').destroy();
        
        document.addEventListener("deviceready", SUtils.apply(App.onDeviceReady, App), false);
        
        var device = JSON.parse(App.extFn().getDeviceUuid());

        if (!window.cordova || (device && device.deviceType && device.deviceType == "Desktop")) { // Esta condición debe ser activada si no se usa la herramienta emuladora de chrome
            SUtils.log("Forcing OnReady Event");
            App.onDeviceReady();
        }
        
        //Ext.Viewport.add(Ext.create('app.view.Main'));
    },

    init: function() {
        var me = this;
        var LoginIsReady = null;

        SUtils.log("app init");

        App.extFn().setAppName(App.name);
        App.extFn().setDefaultLocalModel(Config.LOCALDATA_MODEL_NAME);

        LoginIsReady = App.extFn().getLocalData('UserData');
        me.initialConnectionSettings(LoginIsReady);

        if (!LoginIsReady) {
        	//Ext.Viewport.add(Ext.create('login-panel'));
        	me.showMainView();
        }else {
            me.showMainView();
        }
    },
    
    /**
     * Este método depende del evento onDeviceReady que se ejecuta al cargar Cordova totalmente.
     *
     * @method onDeviceReady
     */
    onDeviceReady: function(e) {
        var me = this;

        if (!me._onDeviceReady) {
            SUtils.log("onDeviceReady");
            document.addEventListener("backbutton", SUtils.apply(me.backButton, me), false);
            document.addEventListener("menubutton", SUtils.apply(me.menubutton, me), false);
            document.addEventListener("online", SUtils.apply(me.online, me), false);
            document.addEventListener("offline", SUtils.apply(me.offline, me), false);
            me.init();
            me._onDeviceReady = true;
        }
    },

    /**
     * Acción ejecutada cuando se presiona el botón back del dispositivo.
     *
     * @method  backButton
     */
    backButton: function(e, flag) {
        
    	var me = this;
        var main = Ext.Viewport.getActiveItem();

        if (App.extFn().hasOverlay()) {
            App.extFn().hideOverlay();
            return false;
        } else if (main && main.getXTypes().indexOf("navigationview") != -1) {

            var ctrl = App.getController("Options");

            console.log(main.getActiveItem().getXTypes().indexOf("course-panel"));
            console.log(me._backCounter);
            
            if (ctrl._menu && !ctrl._menu.isHidden()) {
                Ext.Viewport.hideMenu('left');
            } else if (main.getActiveItem().getXTypes().indexOf("course-panel") != -1) {
                if (!me._backCounter) {
                    me._backCounter = 1;
                    if (!flag) {
                        SUtils.showTooltip("Presione nuevamente para salir.", main.getId());
                    }
                } else if (navigator.app && navigator.app.exitApp) {
                    SUtils.log("navigator.app.exitApp");
                    navigator.app.exitApp();
                } else if (navigator.device && navigator.device.exitApp) {
                    SUtils.log("navigator.device.exitApp");
                    navigator.device.exitApp();
                } else {
                    SUtils.log("window.close");
                    window.close();
                }
            } else {
                main.pop(1);
            }
        }


        SUtils.log("backbutton");
    },

    /**
     * Acción ejecutada cuando se presiona el botón de menu del dispositivo
     *
     * @method  menubutton
     */
    menubutton: function() {
        SUtils.log('menubutton');
    },
    
    /**
     * Esta funcionalidad se ejcuta cuando el dispositivo no obtiene conexión de red
     *
     * @method offline
     */
    offline: function() {
        console.log('offline');
    },

    /**
     * Esta funcionalidad se ejcuta cuando el dispositivo obtiene conexión de red
     *
     * @method online
     */
    online: function() {
        console.log('online');
    },
    /**
     * Ejecuta acciones que requieran conexión de datos al inciar la app.
     *
     * @method initialConnectionSettings
     * @param {boolean} LoginIsReady indica si ya se ha hecho login en la aplicación
     */
    initialConnectionSettings: function(LoginIsReady) {
        var me = this;

        SUtils.log('initial_connection_settings');

        if (App.extFn().checkConnection()) {

            if (LoginIsReady) {
                me.registrarPush();
            }
        } else {
            App.offline();
        }

    },

    /**
     * Muestra la vista principal de la aplicación.
     *
     * @method showMainView
     */
    showMainView: function() {
        var main = Ext.create('widget.mainView');

        if (Ext.Viewport.getActiveItem()) {
            Ext.Viewport.removeAll();
        }

        Ext.Viewport.add(main);
    },
    
    /**
     * Encapsula una referencia a la librería SUtils4Sencha indicando el nombre de la aplicación
     * y el nombre del modelo a usar para almacenar los datos locales.
     *
     * Toda llamada a la librería SUtils4Sencha debe hacerse a través de este método. Por ejemplo:
     *
     * 		var  localData = App.extFn().getLocalData();
     *
     * Otro ejemplo sería el siguiente:
     *
     *  	if( App.extFn().checkConnection() ){
     *  		//acciónes cuando hay conexión
     *  	}else{
     *  		//acciónes cuando no hay conexión
     *  	}
     *
     * @method extFn
     * @return {SUtils4Sencha}
     */
    extFn: function() {
        return SUtils4Sencha;
    },
});
