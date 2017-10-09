/**
 * Componente que muestra las opciones disponible para los usuarios.
 *
 * @class app.view.usuarios.PanelOpciones
 * @module view
 * @extends Ext.Container
 * @autor rbruno <robert.bruno@sigis.com.ve>
 * @opyright Copyright (c) 2015 SIGIS Soluciones Integrales GIS, C.A.
 */
Ext.define("app.view.user.PanelOpciones", {
	extend: 'Ext.Panel',
	xtype: 'panel-opciones-usuario',
	alias: 'panel-opciones-usuario',
	requires: [
		'Ext.List'
	],
	config: {
		layout: {
			type: 'vbox',
			align: 'center'
		},
		defaults : {
			xtype: 'button',
			width: '100%',
            cls: 'menu-button',
            pressedCls: 'x-item-pressed',
			style: 'padding-left: 15px;'
		}
	},
	/**
	 * Inicia el componente
	 *
	 * @method  initialize
	 */
	initialize: function() {
		var me = this;

		me.add(me.getItemsMenu());
	},
	/**
	 * Obtiene las opciones del usuario
	 * 
	 * @method getItemsMenu
	 */
	getItemsMenu: function(data) {
		//var usuario = App.extFn().getLocalData("infoUsuario");
			
		return [
			// Add new options here...
			{
			    text: '<span>Mis Alumnos</span>',
			    iconCls: 'pupils',
				id: 'btnAlumnos'
			},
			{
			    text: '<span>Acerca de...</span>',
			    iconCls: 'info',
				id: 'btnAcercaDe'
			},
			{
			    text: '<span>Compartir</span>',
			    iconCls: 'share',
				id: 'btnShare'
			},
			{
			    text: '<span>Cerrar Sesión</span>',
			    iconCls: 'logout',
				id: 'btnLogout'
			}
		];
	},
	// @private
	onTap: function(e) {
		var me = this;

		if (me.getDisabled()) {
			return false;
		}

		me.fireAction('tap', [me, e]);
	}
});
