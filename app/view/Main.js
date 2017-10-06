/**
 * Vista principal de la aplicación
 * 
 * @class app.view.Main
 * @module view 
 * @since 10/05/2017
 */
Ext.define("app.view.Main", {

    xtype: 'mainView',

    extend: 'Ext.navigation.View',

    requires: [
    	'app.view.common.ImageButton'
    ],

    config: {
        id: 'main',
        autoDestroy: true,
        layout: {
            type: 'card',
            animation: null
        },
        navigationBar: {
            ui: 'light',
            docked: 'top',
            style: 'font-size: .7em;',
            defaults: {
                style: 'color: #FFFFFF;',
                ui: 'plain',
                align: 'left'
            }
        }
    },

    /**
     * 
     * @method   initialize
     */
    initialize: function() {
        var me = this;

        if (!App.extFn().checkConnection()) {
            App.offline();
        }

        me.callParent(arguments);
        me.setDefaultBackButtonText("");

        me.getNavigationBar().setBackButton({
            ui: 'plain',
            iconCls: 'back',
            style: 'font-size: 1.5em;'
        });

        me.getNavigationBar().add(Ext.create("widget.image-button", {
            id: 'logoBtn',
            align: 'left',
            height: '90%',
            image: 'resources/images/logo64.png',
            imageStyle: 'height: 3em; margin: 5px 5px 5px 5px;'
        }));

        me.on("push", function() {
/*            me.validateBackButton();
            var ctrl = App.getController("Options");
            if (ctrl._menu && !ctrl._menu.isHidden()) {
                Ext.Viewport.hideMenu('left');
            }*/
        });

        me.addListener("pop", function(componente, view, eOpts) {
            SUtils.toggleOptionLayerBtn("back");
            me.validateBackButton();
        });

    },

    /**
     * Valida si se muestra o no el botón volver o el logo.
     * Si esta activa la ventana para reportar muestra el icono de reportar sino lo oculta.
     *
     * @method validateBackButton
     */
    validateBackButton: function() {
        var me = this;
        var itemsCount = me.getInnerItems().length;
        var logoBtn = Ext.getCmp("logoBtn");
        var btnAbrirNotific = Ext.getCmp("btnAbrirNotific");

        logoBtn && logoBtn.setHidden(itemsCount > 1 ? true : false);
        btnAbrirNotific && btnAbrirNotific.setHidden(itemsCount > 1 ? true : false);
    }

});