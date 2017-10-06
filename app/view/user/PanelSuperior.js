/**
 * Componente que muestra la descripción previa al registro o inicio de sesión del usuario.
 *
 * @class app.view.usuarios.PanelSuperior
 * @module view
 * @extends Ext.Container
 * @autor rbruno <robert.bruno@sigis.com.ve>
 * @opyright Copyright (c) 2015 SIGIS Soluciones Integrales GIS, C.A.
 */
Ext.define("app.view.user.PanelSuperior", {
	extend: 'Ext.Panel',
	xtype: 'panel-superior-opciones-usuario',
	alias: 'panel-superior-opciones-usuario',
	requires: [
	],
	config: {
		cls: 'panel-superior',
		layout: {
			type: 'hbox',
			align: 'middle'
		}
	},
	/**
	 * Inicia el componente
	 *
	 * @method  initialize
	 */
	initialize: function() {
		var me = this;
		me.callParent(arguments);
		me.element.on({
			scope: me,
			tap: 'onTap'
		});

		/**var data = { 
				Usuario : App.extFn().getLocalData("Usuario"),
				Last : App.extFn().getLocalData("LastLogin")
		}*/
		
		var data = { 
				Usuario : {
					nom_usu : 'Pepito',
					ape_usu : 'De los Palotes',
					ema_usu : 'prueba@gmail.com'
				},
				Last : '21 septiembre 2017 15:43'
		}
		
		me.getItemsMenu(data);
	},
	/**
	 * Obtiene los datos a mostrar en el panel superior del menu de opciones del usuario
	 * 
	 * @method getItemsMenu
	 */
	getItemsMenu: function(data) {
		var items = [];
		var defaultImage = 'resources/images/imagen_bg_usuario300.jpg';
		
		if (data) {
			var nombre = data.Usuario.nom_usu + ' ' + data.Usuario.ape_usu;
			//var fec_ingreso = moment(data.Last).format("DD MMM YYYY HH:mm");
			var fec_ingreso = data.Last;

			items = [{
					xtype: 'panel',

					html:  '<img src="' + data.Usuario.img_usu + '" style="width: 80px; -webkit-border-radius: 50%; border: 2px solid #FFFFFF;" onerror="this.src=\''+ defaultImage +'\'" validate="never"/>'
				}, 
				{
					xtype: 'panel',
					flex: 1,
					style: 'text-align: left; margin-left: 10px;',
					html: '<div style="font-size:0.8em; max-width: 170px; max-height: 35px; white-space: nowrap; text-overflow:ellipsis; overflow: hidden;">' + nombre + '</div>'
							+'<div style="font-size:0.7em; max-width: 170px; max-height: 35px; white-space: nowrap; text-overflow:ellipsis; overflow: hidden;">' + data.Usuario.ema_usu + '</div><br/>'
								+'<div style="font-size:0.5em; max-width: 170px; max-height: 35px; white-space: nowrap; text-overflow:ellipsis; overflow: hidden;">Última conexión ' + fec_ingreso + '</div>'
				}];
		} else {
			items = [{
					xtype: 'panel',
					flex: 1,
					style: 'padding: 0.5em 0em 0.5px 0.5em;',
					html: '<img src="'+defaultImage+'" style="max-width: 70px; webkit-border-radius: 30px;"/>'
				},
				{
					xtype: 'panel',
					flex: 2,
					style: 'text-align: -webkit-left;',
					html: '<div style="font-size:0.8em;">Su sesión ha expirado</div>'
							
				}];
		}		
		
		this.setItems(items);
		
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
