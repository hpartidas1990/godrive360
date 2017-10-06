/**
 * Panel de opciones del usuario.
 *
 * @class app.view.common.MenuUsuario
 * @module view
 * @extends Ext.Menu
 */
Ext.define('app.view.options.MenuUsuario', {
	extend: 'Ext.Menu',
	xtype: 'opciones-menu-usuario',
	alias: 'opciones-menu-usuario',
	requires: [
		'Ext.Container',
		'Ext.Panel',
		'Ext.DataView',
		'app.view.user.PanelSuperior',
		'app.view.user.PanelOpciones'
	],
	config: {
		layout: 'vbox',
		width: '80%',
		maxWidth: '400px',
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
		defaults: {
			style: 'color: #ffffff;'
		}
	},
	initialize: function() {
		var me = this;
		me.add(Ext.create('Ext.Container', {
			items: [
				Ext.create("widget.panel-superior-opciones-usuario"),
				Ext.create("widget.panel-opciones-usuario", {
					scrollable: null,
					minHeight: '400px'
				})
			]
		}));
	}
});