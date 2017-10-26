/**
 * 
 */
Ext.define('app.controller.Options', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.options.MenuUsuario',
		'app.view.options.AboutPanel',
		'app.view.pupils.Panel',
		'app.view.routes.Panel'
	],
	
	config: {
		
		refs: {
			mainView: '#main',
            logoBtn: '#logoBtn',
            btnRoute: '#btnRoute',
            btnPupils: 'panel-opciones-usuario #btnAlumnos',
            btnAbout: 'panel-opciones-usuario #btnAcercaDe'
		},
		
		control: {
			logoBtn: {
                tap: 'showMenuUsuario'
            },
            
            btnRoute : {
            	tap : 'onBtnRouteTap'
            },
            
            btnPupils : {
            	tap : 'onBtnPupilsTap'
            },

            btnAbout : {
            	tap: 'onBtnAboutTap'
            }
		}
	},
	
	onBtnAboutTap : function(){
		this.openPanelMethod("about-panel", "Acerca de...");
	},
	
	onBtnRouteTap : function(){
		this.openPanelMethod("routes-panel", "Rutas");
	},
	
	onBtnPupilsTap : function(){
		this.openPanelMethod("pupils-panel", "Mis Alumnos");
	},
	
	/**
     * Elimina un panel de la lista
     * 
     * @method deletePanel  
     * @param {Object} panel 
     */
    deletePanel: function(panel) {
        for (var i = 0; i < this._optionsPanels.length; i++) {
            this._optionsPanels.splice(i, 1);
        }
    },

    /**
     * Muestra las opciones disponibles para el usuario.
     *
     * @method showAppOptionsPanel
     */
    showMenuUsuario: function() {
        var me = this;
        if (!me._menu) {
            me._menu = Ext.create("app.view.options.MenuUsuario");
            Ext.Viewport.setMenu(me._menu, {
                side: 'left',
                reveal: false
            });
        }

        me.hideShowMenuUsuario();
    },
    /**
     * Oculta el menú con las opciones del usuario.
     * 
     * @method hideShowMenuUsuario
     */
    hideShowMenuUsuario: function() {

        var me = this;
        if (me._menu) {
            if (me._menu.isHidden()) {
                Ext.Viewport.showMenu('left');
            } else {
                Ext.Viewport.hideMenu('left');
            }
        }
    },
    /**
     * 
     * @returns
     */
    openPanelMethod: function(panel, title) {

        var me = this;
        var main = me.getMainView();
        var panel = Ext.create(panel, {
            title: title
        });

        main.setMasked({
            xtype: 'loadmask',
            message: Config.LOADING_TEXT
        });

        me.hideShowMenuUsuario();

        window.setTimeout(function() {
            main.push(panel);
            main.setMasked(false);
        }, 300);
    }
	
});