/**
 * Panel de login de la aplicación
 * 
 * @class app.view.user.LoginPanel
 * @module view
 * @extends Ext.form.Panel
 */
Ext.define("app.view.user.LoginPanel", {

    extend: 'Ext.form.Panel',
    xtype: 'login-panel',
    alias: 'login-panel',
    id: 'login-panel',

    requires: [
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Panel',
        'Ext.Img',
        'Ext.Toolbar'
    ],

    config: {
        layout: 'vbox',
        baseCls: 'login',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        }
    },

    /**
     * Inicializa el componente
     * 
     * @method  initialize
     */
    initialize: function() {
        var me = this;
        me.callParent(arguments);
        me.addCustomComponents();
    },

    /**
     * Agrega los componentes del formulario
     * 
     * @method  addCustomComponents
     */
    addCustomComponents: function() {
        var me = this;
        me.add({ xtype: 'spacer' });

        me.add(Ext.create('Ext.Panel', {
            layout: 'hbox',
            items: [{
                    xtype: 'spacer'
                },
                {
                    xtype: 'panel',
                    style: '',
                    cls: ['login_form'],
                    items: [
                    	{
                    		xtype: 'panel',
                    		
                    		cls: ['redondito'],
                    		style: 'width: 94%; margin: 0 auto; padding-top: 10%; text-align: center; background: rgba(243, 237, 251, 0.8);',
                    		items: [
                    			{
                    				html: ['<img src="resources/images/logo_menu_lateral.png" style="width: 88%;" />']
                    			},
                                {
                                    xtype: 'fieldset',
                                    cls: 'solid',
                                    style: 'margin: 5%;',
                                    items: me.formComponents()
                                },
                                
                                {
                                	xtype: 'button',
                                	text: 'Entrar',
                                	style: 'margin: 5%; margin-top: 15%; opacity: 1;',
                                	id: 'loginBtn',
                                	cls: 'button_1'
                                		
                                }
                    		]
                    	}
                    ]
                },
                {
                    xtype: 'spacer'
                }
            ]
        }));

        me.add({ xtype: 'spacer' });

    },

    /**
     * Obtienes los componenetes del formulario para el usuario y el password
     * 
     * @method getFormComponents
     * @return Array 
     */
    formComponents: function() {
        var me = this;
        var componets = new Array();


        componets.push({
            xtype: 'textfield',
            id: 'userField',
            name: 'log_usu',
            placeHolder: "Usuario"
        });

        componets.push({
            xtype: 'passwordfield',
            id: 'passwordField',
            name: 'pas_usu',
            autoComplete: 'off',
            placeHolder: "Contraseña"
        });

        componets.push({
            xtype: 'hiddenfield',
            id: 'ide_har_equ',
            name: 'ide_har_equ',
            value: App.extFn().getDeviceUuid()
        });

        return componets;

    },

    getSubmitAction: function() {
        return 'onLoginButtonTap';
    }

});