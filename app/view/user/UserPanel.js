/**
 * Panel para gestionar los datos del usuario
 * 
 * @class app.view.user.UserPanel
 * @module view
 * @extends Ext.Panel
 * @author Lisseth Lozada <lisseth.lozada@sigis.com.ve>
 * @copyright Copyright (c) 2015 Soluciones Integrales GIS, C.A.
 */
Ext.define("app.view.user.UserPanel", {

	extend: 'Ext.form.Panel',
	
	xtype : 'user-panel',
	
	alias : 'user-panel',
	
	requires:[
	   'Ext.field.Password',
	   'Ext.field.Hidden',
	   'Ext.field.Toggle',
	   'Ext.field.Email'
	],
    config : {
    	layout : 'vbox'
  	},
  	
	initialize: function()
	{		
		this.add({
            xtype: 'fieldset',
            items: [
				new Ext.Button({
				    id: 'logoutButtom',
					text: 'Cerrar Sesión',
					ui : 'decline'
				})
            ]
        });
	}
});
