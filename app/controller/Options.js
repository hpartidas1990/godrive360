/**
 * 
 */
Ext.define('app.controller.Options', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
		'app.view.options.MenuUsuario',
	],
	
	config: {
		
		refs: {
			mainView: '#main',
            logoBtn: '#logoBtn',
		},
		
		control: {
			logoBtn: {
                tap: 'showMenuUsuario'
            }
		}
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

        me.hiddenShowMenuUsuario();
    },
    /**
     * Oculta el menú con las opciones del usuario.
     * 
     * @method hiddenShowMenuUsuario
     */
    hiddenShowMenuUsuario: function() {

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

        SUtils.toggleOptionLayerBtn(panel);

        var me = this;
        var main = me.getMainView();
        var panel = Ext.create(panel, {
            title: App.extFn().t(title)
        });

        main.setMasked({
            xtype: 'loadmask',
            message: App.extFn().t("cargando")
        });

        me.hiddenShowMenuUsuario();

        window.setTimeout(function() {
            main.push(panel);
            main.setMasked(false);
        }, 500);
    }
	
});